import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UniteeMonnee } from '../model/UniteeMonnee';

@Injectable({
  providedIn: 'root'
})
export class UniteeMonneeService {

  private apiServeUrl =environment.apiBaseUrl;

  constructor(private http: HttpClient) { }
  public addUnitee(uniteeMonnee:UniteeMonnee): Observable<UniteeMonnee>
  {
    return this.http.post<UniteeMonnee>(`${this.apiServeUrl}/admin/unitee`,uniteeMonnee);
  }

  public getUnitees(): Observable<UniteeMonnee[]>
  {
    return this.http.get<UniteeMonnee[]>(`${this.apiServeUrl}/admin/unitees`);
  }
}
