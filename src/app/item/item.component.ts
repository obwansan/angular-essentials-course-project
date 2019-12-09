import { Component, OnInit, Input } from '@angular/core';

import { StarWarsService } from '../star-wars.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  // Make the character property bindable from outside.
  // In the <app-item> selector in list.component.html, the character property is bound to the char
  // of the characters *ngFor loops over. char is each of the character objects in the characters array
  // set in TabsComponent. So the character property in ItemComponent will hold the character object
  // corresponding to the clicked item.
  @Input() character;
  swService: StarWarsService;

  // Dependency injection: inject/pass the service into the class/component when it's instantiated.
  constructor(swService: StarWarsService) {
    this.swService = swService;
   }

  ngOnInit() {
  }

  onAssign(side) {
    // this.character.side = side;
    // The object is emmitted to the parent component (i.e. ListComponent)
    // this.sideAssigned.emit({ name: this.character.name, side: side });
    this.swService.onSideChosen({name: this.character.name, side: side});
  }


}
