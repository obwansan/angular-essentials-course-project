import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  // Decorating the 'characters' property with the @Input decorator allows you to bind/assign
  // values to it in the <app-list> selector. Bit like passing props in React.
  @Input() characters;

  constructor() { }

  ngOnInit() {
  }

}
