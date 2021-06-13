import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-note-modal',
  templateUrl: './note-modal.component.html',
  styleUrls: ['./note-modal.component.scss']
})
export class NoteModalComponent implements OnInit {
  @Input() featureSelected: string = "";

  constructor() { }

  ngOnInit(): void { }
}
