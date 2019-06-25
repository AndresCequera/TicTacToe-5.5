import { Component, OnInit, Input } from '@angular/core';
import { StateService, GameSaved } from '../state.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-game-saved',
  templateUrl: './game-saved.component.html',
  styleUrls: ['./game-saved.component.css']
})
export class GameSavedComponent implements OnInit {

  private _gameSaved: GameSaved[];
  private _stateService: StateService;

  constructor(stateService: StateService, private router: Router) {
    this._gameSaved = stateService.GetGame();
    this._stateService = stateService;
  }

  ngOnInit() {
  }

  _handleDeleteClick(id) {
    this._stateService.PutGame(id);
  }

  _handleContinueClick(id) {
    let navigationExtra: NavigationExtras = {
      queryParams: { ['id']: id }
    };

    this.router.navigate(['/continue/'], navigationExtra);
  }

}
