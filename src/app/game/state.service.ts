import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface State {
  turn: string;
  message: string;
  movements: number;
  values: string[][];
  player_name: string
}

export class GameSaved {
  player_name: string;
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private _state$: BehaviorSubject<State>;
  private _gameSaved: GameSaved[];
  private _tempGameSaved: GameSaved;

  constructor() {
    let initialState = {
      turn: 'PLAYERX',
      message: 'Turn of ',
      movements: 0,
      values: [
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-']
      ],
      player_name: ''
    };

    let initialGameSaved ={
      player_name: 'Enrique',
      id: 'i216a'
    }

    this._gameSaved = [];
    this._gameSaved.push(initialGameSaved);
    this._tempGameSaved = new GameSaved();
    this._state$ = new BehaviorSubject(initialState);
  }

  get state$(): BehaviorSubject<State> {
    return this._state$;
  }

  get state(): State {
    return this._state$.getValue();
  }

  set state(state: State) {
    this._state$.next(state);
  }

  updateValue(row, col) {
    if (this.state.values[row][col] === '-' && this.state.message === 'Turn of ') {
      let newValue = this.state.turn === 'PLAYERX' ? 'X' : '0';
      let newTurn = this.state.turn === 'PLAYERX' ? 'PLAYER0' : 'PLAYERX';
      this.state.values[row][col] = newValue;
      this.state.turn = newTurn;
      this.state.movements++;

      if (this.state.values[0][0] === newValue && this.state.values[0][1] === newValue && this.state.values[0][2] === newValue
        || this.state.values[1][0] === newValue && this.state.values[1][1] === newValue && this.state.values[1][2] === newValue
        || this.state.values[2][0] === newValue && this.state.values[2][1] === newValue && this.state.values[2][2] === newValue
        || this.state.values[0][0] === newValue && this.state.values[1][0] === newValue && this.state.values[2][0] === newValue
        || this.state.values[0][1] === newValue && this.state.values[1][1] === newValue && this.state.values[2][1] === newValue
        || this.state.values[0][2] === newValue && this.state.values[1][2] === newValue && this.state.values[2][2] === newValue
        || this.state.values[0][0] === newValue && this.state.values[1][1] === newValue && this.state.values[2][2] === newValue
        || this.state.values[0][2] === newValue && this.state.values[1][1] === newValue && this.state.values[2][0] === newValue
      ) {
        this.state.message = 'Winner ';
        this.state.turn = 'PLAYER' + newValue;
      }

      this._state$.next(this.state);
    }
  }

  reset() {
    this.state = {
      turn: 'PLAYERX',
      message: 'Turn of ',
      movements: 0,
      values: [
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-']
      ],
      player_name: ''
    };
  }


  //Game Saved
  SaveGame(id: string, name: string){
    this._tempGameSaved.player_name = name; 
    this._tempGameSaved.id = id;
    this._gameSaved.push(this._tempGameSaved);
    localStorage.setItem('gameSaved', JSON.stringify(this._gameSaved));
  }

  GetGame(){
    return this._gameSaved = JSON.parse(localStorage.getItem('gameSaved'));
  }

  PutGame(id: string){
    this._tempGameSaved.id = id;
    let index = this._gameSaved.findIndex( x => x.id === id);
    this._gameSaved.splice(index, 1);
    localStorage.setItem('gameSaved', JSON.stringify(this._gameSaved));
  }


}
