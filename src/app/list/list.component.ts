import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StarWarsService } from 'app/star-wars.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  characters = [];
  activatedRoute: ActivatedRoute;
  swService: StarWarsService;

  constructor(activatedRoute: ActivatedRoute, swService: StarWarsService) {
    this.activatedRoute = activatedRoute;
    this.swService = swService;
  }

  ngOnInit() {
    // subscribing to an observable (i.e. asynchronously listening for changes in the route parameters)
    this.activatedRoute.params.subscribe(
      // this function is executed whenever parameters change (passed the changed params)
      (params) => {
        // the name 'side' has to be identical to the param name used in the route in app.module
        // e.g. { path: ':side', component: ListComponent }
        this.characters = this.swService.getCharacters(params.side);
      }
    );
  }

}
