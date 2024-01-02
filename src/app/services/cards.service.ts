import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { Card, CardDto } from '@models/card.model';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  apiUrl = environment.API_URL;

  constructor(
    private http: HttpClient
  ) { }

  update(pId: Card['id'], pChanges: CardDto) {
    return this.http.put(this.apiUrl + '/api/v1/cards/' + pId, pChanges, {
      context: checkToken()
    });
  }
}
