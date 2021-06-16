import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotesService } from '../../services/notes.service';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {
  @ViewChild('closebutton') closebutton: any;
  noteId!: string;
  subscription!: Subscription;
  errorMessage: string = "";

  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
    this.subscription = this.notesService.startedEditing.subscribe((id: string) => {
      this.noteId = id;
    });
  }

  onDelete() {
    this.notesService.deleteNote(this.noteId).subscribe(
      () => {
        this.noteId = "";
        this.errorMessage = "";
        this.closebutton.nativeElement.click();
      },
      err => {
        this.errorMessage = err.message;
      }
    );
  }
}
