import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CardService} from "../../services/card.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Card} from "../../models/card";

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss']
})
export class CardModalComponent implements OnInit{

  cardForm !: FormGroup;
  constructor(
    private _snackBar: MatSnackBar,
    private dialogRef : MatDialogRef<CardModalComponent>,
    private fb:FormBuilder,
    private cardService: CardService,
    @Inject(MAT_DIALOG_DATA) public data:Card
  ) {
  }
  ngOnInit(): void {
    this.cardForm = this.fb.group({
      name: [this.data?.name || '' , [Validators.maxLength(50)]],
      title:[this.data?.title || '' , [Validators.required , Validators.maxLength(250)]],
      phone:[this.data?.phone || '' , [Validators.required , Validators.maxLength(20)]],
      email:[this.data?.email || '' , [Validators.email , Validators.maxLength(50)]],
      address:[this.data?.address ||'' , [Validators.maxLength(250)]],
    });
  }
  addCard() : void {
  console.log(this.cardForm.value);
  this.cardService.addCard(this.cardForm.value)
    .subscribe((res:any) =>
  {
    console.log(this.cardForm.value);
    this._snackBar.open(res|| 'Card Added','' , {
      duration:4000,
    })
    this.cardService.getCards(); // ekranda eklenen kartı anında göstermek için
    this.dialogRef.close();
  });
  }

  updateCard() {
  this.cardService.updateCard( this.cardForm.value, this.data.id)
    .subscribe( (res : any) =>
    {
      this._snackBar.open(res|| 'Card Updated','' , {
        duration:4000,
      })
      this.cardService.getCards(); // ekranda güncelleme işlemini anında göstermek için
      this.dialogRef.close();
    });
  }
}
