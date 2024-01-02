import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Dialog } from '@angular/cdk/dialog';
import { CardDialogComponent } from '@boards/components/card-dialog/card-dialog.component';

import { Column } from '@models/todo.model';
import { ActivatedRoute } from '@angular/router';
import { BoardsService } from '@services/boards.service';
import { Board } from '@models/board.model';
import { Card } from '@models/card.model';
import { CardsService } from '@services/cards.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styles: [
    `
      .cdk-drop-list-dragging .cdk-drag {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }
      .cdk-drag-animating {
        transition: transform 300ms cubic-bezier(0, 0, 0.2, 1);
      }
    `,
  ],
})
export class BoardComponent implements OnInit {
  board: Board | null = null;

  constructor(
    private dialog: Dialog,
    private route: ActivatedRoute,
    private boardsService: BoardsService,
    private cardsService: CardsService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.getBoard(id);
      }
    })
  }

  getBoard(pId: string) {
    this.boardsService.getBoard(pId)
    .subscribe({
      next: (board) => {
        this.board = board;
      }
    })
  }

  drop(event: CdkDragDrop<Card[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    const card = event.container.data[event.currentIndex];
    const position = this.boardsService.getPosition(event.container.data, event.currentIndex);
    const listId = event.container.id;

    this.cardsService.update(card.id, {position, listId})
    .subscribe();
  }

  addColumn() {
    
  }

  openDialog(card: Card) {
    const dialogRef = this.dialog.open(CardDialogComponent, {
      minWidth: '300px',
      maxWidth: '50%',
      data: {
        card: card,
      },
    });
    dialogRef.closed.subscribe((output) => {
      if (output) {
        console.log(output);
      }
    });
  }
}
