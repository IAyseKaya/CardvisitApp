import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CardModalComponent} from "./card-modal/card-modal.component";
import {CardService} from "../services/card.service";
import {Card} from "../models/card";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit{

  cards !: Card[];
constructor(
  public dialog:MatDialog,
  private cardService:CardService,
) {}
ngOnInit() : void {
  this.getCard();
}

openAddCardModal():void{
  this.dialog.open(CardModalComponent,
    {width: '800px'});

}
getCard(){
  this.cardService.getCards().subscribe(  (res:Card[]) =>
  {
    console.log('data ');
    this.cards = res;
  })
}
}
