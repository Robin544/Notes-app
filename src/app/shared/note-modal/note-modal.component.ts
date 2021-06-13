import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-note-modal',
  templateUrl: './note-modal.component.html',
  styleUrls: ['./note-modal.component.scss']
})
export class NoteModalComponent implements OnInit {
  @Input() featureSelected: string = "";
  noteForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.noteForm = new FormGroup({
      "title": new FormControl(null, [Validators.required, Validators.minLength(3)]),
      "content": new FormControl(null, [Validators.required, Validators.minLength(20)])
    })
  }

  onSubmitNote() {
    console.log(this.noteForm.value);
  }
}
