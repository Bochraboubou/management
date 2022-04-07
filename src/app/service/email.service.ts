import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Email } from '../model/Email';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
email=new Email();

  constructor( private _http:HttpClient) { }

  /*public sendMailFormRemote(mail:Email):Observable<Email>{
    return this._http.post<any>("http://localhost:8085/send",mail);
  }
  */
 //destinataire:string,objet:string,code:string
  affiche(mail:Email):Observable<Email> {
 
    return this._http.post<any>("http://localhost:8085/send/",mail);
    
  }
  affiche2(mail:Email):Observable<Email> {
 
    return this._http.post<any>("http://localhost:8085/send/",mail);
    
  }
  
}