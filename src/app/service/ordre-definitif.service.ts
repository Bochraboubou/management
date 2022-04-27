import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrdreDefinitif } from '../model/OrdreDefinitif';

@Injectable({
  providedIn: 'root'
})
export class OrdreDefinitifService {
  apiServeUrl=environment.apiBaseUrl
  constructor(private http:HttpClient) { }

  public getOTbyOTid(ordreID:number): Observable<OrdreDefinitif[]>
  {
    return this.http.get<OrdreDefinitif[]>(`${this.apiServeUrl}/admin/listeOrdreDefByOTid/${ordreID}`);
  }
 
}
