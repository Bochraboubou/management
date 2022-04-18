import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Email } from '../model/Email';

@Injectable({
  providedIn: 'root'
})
export class MainSkipTestsService {
  apiServeUrl=environment.apiBaseUrl;
  constructor( private http:HttpClient) { }


  sendEmail(mail:Email): Observable<Email>
  {
    return this.http.post<Email>(`${this.apiServeUrl}/api/sendEmail`,Email);
  }
  public affich(){
    console.log("bbb");
  }
}
