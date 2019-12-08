export class StarWarsService {
  private characters = [
    { name: 'Luke Skywalker', side: '' },
    { name: 'Darth Vader', side: '' }
  ];

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
    // Assign the selected side ('light' or 'dark' to )
    this.characters[pos].side = charInfo.side;
  }
}
