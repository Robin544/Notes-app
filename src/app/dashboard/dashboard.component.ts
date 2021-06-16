import { Component, OnInit } from '@angular/core';
import { Note } from '../models/note.model';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  actionType: string = "Add";

  notes: Note[] = [];
  isLoading: boolean = true;
  errorMessage: string = "";

  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
    this.fetchNotes();
  }

  fetchNotes = () => {
    this.isLoading = true;

    this.notesService.getNotes().subscribe(
      _notes => {
        this.notes = _notes;
        this.isLoading = false;
      },
      err => {
        this.errorMessage = err.message;
        this.isLoading = false;
      }
    )
  }

  setActionType(_actionType: string, id?: string) {
    this.actionType = _actionType;
    if (id) {
      this.notesService.startedEditing.next(id);
    }
  }

  onDeleteNote(id: string) {
    this.notesService.startedEditing.next(id);
  }
}
