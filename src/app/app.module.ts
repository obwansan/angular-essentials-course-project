import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TabsComponent } from './tabs/tabs.component';
import { ListComponent } from './list/list.component';
import { ItemComponent } from './item/item.component';
import { StarWarsService } from './star-wars.service';
import { LogService } from './log.service';
import { CreateCharacterComponent } from './create-character/create-character.component';
import { HeaderComponent } from './header/header.component';

const routes = [
  // the child will be the next url segment, e.g. characters/light
  { path: 'characters', component: TabsComponent, children: [
    { path: '', redirectTo: 'all', pathMatch: 'full' },
    { path: ':side', component: ListComponent }
  ] },
  { path: 'new-character', component: CreateCharacterComponent },
  { path: '**', redirectTo: '/characters'}
]

// Creating a component via the command line automatically adds it to the declarations array.

// Adding a service to the providers array means you can use it across the whole app / in all components.
// You can add a service to a provider array in the @Component decorator of each component, but it's
// bad practice as you can end up with multiple instances of the service doing different things.
// You have to add a service that's injected into another service into the providers array.
@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    ListComponent,
    ItemComponent,
    CreateCharacterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // passing in the routes array registers the routes in the router module
    RouterModule.forRoot(routes)
  ],
  providers: [StarWarsService, LogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
