import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  // Decorating the 'characters' property with the @Input decorator allows you to bind/assign
  // values to it in the <app-list> selector. Bit like passing props in React.
  @Input() characters;
  @Output() sideAssigned = new EventEmitter<{name: string, side: string}>();

  constructor() { }

  ngOnInit() {
  }

  onSideAssigned(charInfo) {
    this.sideAssigned.emit(charInfo);
  }

}
