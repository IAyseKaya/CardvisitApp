import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CardService} from "../../services/card.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Card} from "../../models/card";
import {SnackbarService} from "../../services/snackbar.service";

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss']
})
export class CardModalComponent implements OnInit{

  cardForm !: FormGroup;
  showSpinner : boolean = false;



  constructor(
    private _snackBar: MatSnackBar,
    private snackbarServices : SnackbarService,
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
    this.showSpinner = true;
  console.log(this.cardForm.value);
  this.cardService.addCard(this.cardForm.value)
    .subscribe((res:any) =>
  {
    this.getSuccess(res || 'Cardvisit Added.')
  },(err : any) => {
      this.getError(err.message || 'An Error Occured.' )
    });
  }

  updateCard() {
    this.showSpinner = true;
  this.cardService.updateCard( this.cardForm.value, this.data.id)
    .subscribe( (res : any) =>
    {
      this.getSuccess(res || 'Cardvisit Updated.')
    } ,(err : any) => {
      this.getError(err.message || 'An Error Occured.' )
    });
  }


  deleteCard() : void{
    this.showSpinner = true;
    this.cardService.deleteCard(this.data.id)
      .subscribe((res:any) => {
       this.getSuccess(res || 'Cardvisit Deleted.')
      },(err : any) => {
        this.getError(err.message || 'An Error Occured.' )
      });
  }
  getSuccess(message :string) : void{
    this.snackbarServices.createSnackbar('success' , message , 9999999);
    this.cardService.getCards();// ekranda güncelleme işlemini anında göstermek için
    this.showSpinner = false;
    this.dialogRef.close(); // açılan ekranın kapanması
  }
  getError(message : string) : void{
    this.snackbarServices.createSnackbar('error' ,message);
    this.cardService.getCards();// ekranda güncelleme işlemini anında göstermek için
    this.showSpinner = false;
    this.dialogRef.close();
  }
//1.44 dk
}
