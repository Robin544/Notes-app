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
  noteIndex!: number;
  subscription!: Subscription

  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
    this.subscription = this.notesService.startedEditing.subscribe((index: number) => {
      this.noteIndex = index;
    });
  }

  onDelete() {
    this.notesService.deleteNote(this.noteIndex);
    this.noteIndex = -1;
    this.closebutton.nativeElement.click();
  }
}
