import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit{

cardItem = {
  title :'first card',
  name : 'ayşe',
  tel : '0505000000',
  email :'example@gmail.com',
  address:'somewhere',
};
constructor() {
}
ngOnInit() : void {
}
}
