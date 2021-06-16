import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Note } from '../../models/note.model';
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
  noteId!: string;
  editedNote!: Note;
  errorMessage: string = "";
  disabled: boolean = false;

  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
    this.noteForm = new FormGroup({
      "title": new FormControl(null, [Validators.required, Validators.minLength(3)]),
      "content": new FormControl(null, [Validators.required, Validators.minLength(20)])
    })

    this.subscription = this.notesService.startedEditing.subscribe((id: string) => {
      if (id) {
        this.noteId = id;
        this.notesService.getNote(id).subscribe(
          note => {
            this.errorMessage = "";
            this.noteForm.setValue({
              title: note.title,
              content: note.content
            });
          },
          error => { this.errorMessage = error.message; }
        );
      }
    });
  }

  onSubmitNote() {
    let values: Note = this.noteForm.value;
    this.disabled = true;
    if (this.noteId) {
      this.notesService.updateNote(this.noteId, values).subscribe(
        note => {
          this.noteForm.reset();
          this.errorMessage = "";
          this.closebutton.nativeElement.click();
        },
        error => {
          this.disabled = false;
          this.errorMessage = error.message;
        }
      );
    } else {
      this.notesService.addNote(values).subscribe(
        note => {
          this.noteForm.reset();
          this.errorMessage = "";
          this.closebutton.nativeElement.click();
        },
        error => {
          this.disabled = false;
          this.errorMessage = error.message;
        }
      );
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
