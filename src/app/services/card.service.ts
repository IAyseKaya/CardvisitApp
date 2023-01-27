import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Card} from "../models/card";

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(
    // app.module deki provide olan apiUrl i dosyaya getirmek için inject kullanıldı
    @Inject('apiUrl') private apiUrl : string,
    private http: HttpClient
  ) { }
  getCards() : Observable<Card[]>{
  return this.http.get<Card[]>( this.apiUrl + '/cards');

  }


}
