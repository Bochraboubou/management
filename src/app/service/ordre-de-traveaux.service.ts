import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrdreDeTraveaux } from '../model/OrdreDeTraveaux';

@Injectable({
  providedIn: 'root'
})
export class OrdreDeTraveauxService {
  apiServeUrl=environment.apiBaseUrl

  constructor(private http: HttpClient) { }
  public getOrdreDeTraveauById(id:number): Observable<OrdreDeTraveaux>
  {
    return this.http.get<OrdreDeTraveaux>(`${this.apiServeUrl}/admin/OrdreById/${id}`);
  }
  // find liste of ordre de traveau by bon de commende id 
  public getOTbyBCid(bcID:number): Observable<OrdreDeTraveaux[]>
  {
    return this.http.get<OrdreDeTraveaux[]>(`${this.apiServeUrl}/admin/findBYBC/${bcID}`);
  }

}
