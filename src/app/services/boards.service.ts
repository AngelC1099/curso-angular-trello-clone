import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { Board } from '@models/board.model';
import { Card } from '@models/card.model';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {
  apiUrl = environment.API_URL;
  bufferSpace = 65535;

  constructor(
    private http: HttpClient
  ) { }

  getBoard(pId: Board['id']) {
    return this.http.get<Board>(this.apiUrl + '/api/v1/boards/' + pId, {
      context: checkToken()
    });
  }

  getPosition(cards: Card[], currentIndex: number) {
    if (cards.length == 1) {
      return this.bufferSpace;
    }
    else if (currentIndex == 0) {
      return cards[1].position / 2;
    }
    else if (currentIndex > 0 && currentIndex < cards.length - 1) {
      return (cards[currentIndex - 1].position + cards[currentIndex + 1].position) / 2;
    }
    else {
      return cards[cards.length - 2].position + this.bufferSpace;
    }
  }
}
