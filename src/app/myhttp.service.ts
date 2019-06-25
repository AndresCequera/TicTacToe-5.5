import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyhttpService {

  private urlService = 'https://api.myjson.com/bins/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
      
    })
  };

  constructor(private httpClient: HttpClient) { }

  getSaveGame(params: any) {
    return this.httpClient.get(this.urlService + params);
  }

  postSaveGame(params: any) {
    return this.httpClient.post(this.urlService, params)
  }

}
