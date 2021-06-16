import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Subscription, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Note } from '../models/note.model';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  notes: Note[] = [];
  firebaseURL: string = "https://notes-app-dcb8c-default-rtdb.firebaseio.com/";

  notesArrayModified = new Subject<Note[]>();
  startedEditing = new Subject<string>();

  constructor(
    private loggingService: LoggingService,
    private http: HttpClient
  ) { }

  addNote(note: Note) {
    return this.http
      .post<{ name: string }>(
        this.firebaseURL + "notes.json",
        note
      )
      .pipe(
        map(response => {
          this.loggingService.consoleInfo("Note is created successfuly.", response);
          return response;
        }),
        catchError(err => {
          this.loggingService.consoleError(err.message);
          return throwError(err);
        })
      );
  }

  updateNote(id: string, note: Note) {
    return this.http
      .put<{ name: string }>(
        this.firebaseURL + "notes" + `/${id}.json`,
        note
      )
      .pipe(
        map(response => {
          this.loggingService.consoleInfo("Note is updated successfuly.", response);
          return response;
        }),
        catchError(err => {
          this.loggingService.consoleError(err.message);
          return throwError(err);
        })
      );
  }

  getNotes() {
    return this.http
      .get<{ [key: string]: Note }>(
        this.firebaseURL + "notes.json",
        {
          responseType: 'json'
        }
      )
      .pipe(
        map(response => {
          const notesArray: Note[] = [];
          for (const key in response) {
            if (response.hasOwnProperty(key)) {
              notesArray.push({ ...response[key], id: key });
            }
          }
          this.loggingService.consoleInfo("Notes are fetched successfully.", notesArray);
          this.notes = notesArray;
          return this.notes;
        }),
        catchError(err => {
          this.loggingService.consoleError(err.message);
          return throwError(err);
        })
      );
  }

  getNote(id: string) {
    return this.http
      .get<Note>(
        this.firebaseURL + "notes" + `/${id}.json`,
        {
          responseType: 'json'
        }
      )
      .pipe(
        map(response => {
          this.loggingService.consoleInfo("Note is fetched successfully.", response);
          return response;
        }),
        catchError(err => {
          this.loggingService.consoleError(err.message);
          return throwError(err);
        })
      );
  }

  deleteNote(id: string) {
    return this.http
      .delete<{ name: string }>(
        this.firebaseURL + "notes" + `/${id}.json`
      )
      .pipe(
        map(response => {
          this.loggingService.consoleInfo("Note is deleted successfuly.", response);
          return response;
        }),
        catchError(err => {
          this.loggingService.consoleError(err.message);
          return throwError(err);
        })
      );
  }
}
