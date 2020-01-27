import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StarWarsService } from 'app/star-wars.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
// An interface (e.g. OnDestroy) is a contract that forces us to implement a certain method.
// (e.g. ngOnDestroy)
export class ListComponent implements OnInit, OnDestroy {
  characters = [];
  activatedRoute: ActivatedRoute;
  swService: StarWarsService;
  loadedSide = 'all';
  subscription;

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
        this.loadedSide = params.side;
      }
    );
    this.subscription = this.swService.charactersChanged.subscribe(
      () => {
        this.characters = this.swService.getCharacters(this.loadedSide);
      }
    )
  }
  // Removes the subsription to the observable so it doesn't become a memory leak
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
