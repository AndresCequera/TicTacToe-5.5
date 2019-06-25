import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { MyhttpService } from 'src/app/myhttp.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  private _stateService: StateService;
  private _myHttpService: MyhttpService;

  constructor(stateService: StateService, myHttpService: MyhttpService) {
    this._stateService = stateService;
    this._myHttpService = myHttpService;
  }

  ngOnInit() {
  }

  reset() {
    this._stateService.reset();
  }

  _handleSaveClick() {
    this._myHttpService.postSaveGame(this._stateService.state).subscribe((response: any) => { 
      let data = response.uri.replace('https://api.myjson.com/bins//','');
      console.log(data);
      console.log(this._stateService.state.player_name);
      this._stateService.SaveGame(data, this._stateService.state.player_name);

    }
      , error => {
        console.log(error.statusText)
      });
  }

}
