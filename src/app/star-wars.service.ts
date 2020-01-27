import { LogService } from './log.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

// The @Injectable decorator marks a class as available to be provided and injected as a dependency.
// Marking a class with @Injectable ensures that the compiler will generate the necessary metadata
// to create the class's dependencies when the class is injected.
// Why don't you need it when injecting a class into a class component, but do for a class service?
@Injectable()
export class StarWarsService {

  private characters = [
    { name: 'Luke Skywalker', side: '' },
    { name: 'Darth Vader', side: '' }
  ];
  private logService: LogService;
  // An rxjs Subject is basically the same as an Angular event emitter (it emits a value
  // and you can subscribe to it). Just better architectural practice to use a Subject.
  charactersChanged = new Subject<void>();

  // Injecting a service into a service.
  // You can only do this if you specifiy the service as a provider in the app module.
  constructor(logService: LogService) {
    this.logService = logService;
  }

  getCharacters(chosenList) {
    // Slicing ensures that the original array can't be modified.
    // If 'All' tab is clicked, show all characters in the array
    if (chosenList === 'all') {
      return this.characters.slice();
    }
    // If 'Light' or 'Dark' tab is clicked, show only those characters whose side matches
    // the chosen list (i.e. the selected 'All', 'Light' or 'Dark' tab).
    return this.characters.filter((char) => {
      return char.side === chosenList;
    });
  }

  // When you click the Light or Dark button (in <app-item>), onAssign() is called, which uses the
  // sideAssigned eventEmitter object to emit the selected character object to its parent object,
  // ListComponent. <app-item> in list.component.html listens for the sideAssigned emit event and
  // calls onSideAssigned($event), passing it the originally emmitted character object (charInfo).
  // ListComponent in turn emits the character object. <app-list> in tabs.component.html listens for
  // the sideAssigned emit event and calls onSideChosen(), passing it the character object (charInfo).
  onSideChosen(charInfo) {
    // Get the index of the selected/clicked character in the characters array
    const pos = this.characters.findIndex((char) => {
      return char.name === charInfo.name;
    });
    // Assign the selected side ('light' or 'dark') to the selected character.
    this.characters[pos].side = charInfo.side;
    this.charactersChanged.next();
    this.logService.writeLog('Changed side of ' + charInfo.name + '. New side: ' + charInfo.side);
  }

  addCharacter(name, side) {
    // Check if the submitted name has already been added.
    const pos = this.characters.findIndex((char) => {
      return char.name === name;
    });
    // Don't add character if the name is already in the characters array.
    if (pos !== -1) {
      return;
    }
    const newChar = {name: name, side: side};
    this.characters.push(newChar);
  }
}
