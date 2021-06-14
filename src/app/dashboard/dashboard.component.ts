import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotesModule } from '../models/notes.module';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  actionType: string = "Add";

  notes: NotesModule[] = [];
  subscription!: Subscription;

  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
    this.notes = this.notesService.getNotes();
    this.subscription = this.notesService.notesArrayModified.subscribe((_notes: NotesModule[]) => {
      this.notes = _notes;
    })
  }

  setActionType(_actionType: string, i?: number) {
    this.actionType = _actionType;
    if (i !== -1) {
      this.notesService.startedEditing.next(i);
    }
  }

  onDeleteNote(index: number) {
    this.notesService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
