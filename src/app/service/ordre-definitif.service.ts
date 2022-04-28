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
 

//ajouter un ordre definitif à un OT
  public addOrdreDefinitif(OTId:number,articleId:number,ordreDefinitif:OrdreDefinitif): Observable<OrdreDefinitif>
{
  return this.http.post<OrdreDefinitif>(`${this.apiServeUrl}/admin/ordreTraveaux/${OTId}/article/${articleId}/ordreDefintif`,ordreDefinitif);
}

}
