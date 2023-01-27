import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CardModalComponent} from "./card-modal/card-modal.component";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit{

cardItem = {
  title :'first card',
  name : 'ayşe',
  phone : '0505000000',
  email :'example@gmail.com',
  address:'somewhere',
};
constructor(
  public dialog:MatDialog
) {}
ngOnInit() : void {
}

openAddCardModal():void{
  this.dialog.open(CardModalComponent,
    {width: '800px'});

}
}
