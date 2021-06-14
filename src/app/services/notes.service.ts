import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NotesModule } from '../models/notes.module';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  notes: NotesModule[] = [
    new NotesModule("Note 1", "Notes is a notetaking app developed by Apple. It is provided on their iOS and macOS operating systems, the latter starting with OS X 10.8 Mountain Lion. It functions as a service for making short text notes, which can be synchronised between devices using Apple's iCloud service."),
    new NotesModule("Note 2", "Notes is a notetaking app developed by Apple. It is provided on their iOS and macOS operating systems, the latter starting with OS X 10.8 Mountain Lion. It functions as a service for making short text notes, which can be synchronised between devices using Apple's iCloud service."),
    new NotesModule("Note 3", "Notes is a notetaking app developed by Apple. It is provided on their iOS and macOS operating systems, the latter starting with OS X 10.8 Mountain Lion. It functions as a service for making short text notes, which can be synchronised between devices using Apple's iCloud service."),
    new NotesModule("Note 4", "Notes is a notetaking app developed by Apple. It is provided on their iOS and macOS operating systems, the latter starting with OS X 10.8 Mountain Lion. It functions as a service for making short text notes, which can be synchronised between devices using Apple's iCloud service.")
  ];

  notesArrayModified = new Subject<NotesModule[]>();
  startedEditing = new Subject<number>();

  constructor(private loggingService: LoggingService) { }

  addNote(note: NotesModule) {
    this.notes.push(note);
    this.notesArrayModified.next(this.notes.slice());
    this.loggingService.consoleInfo("Note is created successfuly.");
  }

  updateNote(index: number, note: NotesModule) {
    this.notes[index] = note;
    this.notesArrayModified.next(this.notes.slice());
    this.loggingService.consoleInfo("Note is updated successfully.");
  }

  getNotes() {
    this.loggingService.consoleInfo("Notes are fetched successfully.");
    return this.notes.slice();
  }

  getNote(index: number) {
    this.loggingService.consoleInfo("Note is fetched successfully.");
    return {...this.notes[index]};
  }

  deleteNote(index: number) {
    this.notes.splice(index, 1);
    this.notesArrayModified.next(this.notes.slice());
    this.loggingService.consoleInfo("Note is deleted successfully.");
  }
}
