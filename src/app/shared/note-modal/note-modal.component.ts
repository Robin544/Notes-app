import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NotesModule } from '../../models/notes.module';
import { NotesService } from '../../services/notes.service';

@Component({
  selector: 'app-note-modal',
  templateUrl: './note-modal.component.html',
  styleUrls: ['./note-modal.component.scss']
})
export class NoteModalComponent implements OnInit, OnDestroy {
  @ViewChild('closebutton') closebutton: any;
  @Input() featureSelected: string = "";
  noteForm!: FormGroup;
  subscription!: Subscription;
  noteIndex!: number;
  editedNote!: NotesModule;

  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
    this.noteForm = new FormGroup({
      "title": new FormControl(null, [Validators.required, Validators.minLength(3)]),
      "content": new FormControl(null, [Validators.required, Validators.minLength(20)])
    })

    this.subscription = this.notesService.startedEditing.subscribe((index: number) => {
      if (index !== -1 && index !== undefined) {
        this.noteIndex = index;
        this.editedNote = this.notesService.getNote(index);

        this.noteForm.setValue({
          title: this.editedNote.title,
          content: this.editedNote.content
        })
      }
    });
  }

  onSubmitNote() {
    let values: NotesModule = this.noteForm.value;
    if (this.noteIndex !== -1 && this.noteIndex !== undefined) {
      this.notesService.updateNote(this.noteIndex, values);
    } else {
      this.notesService.addNote(values);
    }
    this.noteForm.reset();
    this.noteIndex = -1;
    this.closebutton.nativeElement.click();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
