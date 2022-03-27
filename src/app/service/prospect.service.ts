import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Prospect } from '../model/Prospect';

@Injectable({
  providedIn: 'root'
})
export class ProspectService {
  apiServeUrl=environment.apiBaseUrl;
  constructor(private http:HttpClient) { }

  public addProspect(prospect:Prospect): Observable<Prospect>
  {
    return this.http.post<Prospect>(`${this.apiServeUrl}/api/saveprospect`,prospect);
  }
public trouverParEmailEtCode(email:string, code:string): Observable<Prospect>{
  return this.http.get<Prospect>(`${this.apiServeUrl}/api/byEmailAndCode/${email}/code/${code}`);
}
public trouverParEmail(email:string): Observable<Prospect>{
  return this.http.get<Prospect>(`${this.apiServeUrl}/api/findProspect/${email}`);
}

}
