import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdreDeTraveauxService {
  private apiServeUrl =environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  
  //récuperer le total des montant des OT
  public getArticlebyCodeandMetierId(): Observable<number>
  {
    return this.http.get<number>(`${this.apiServeUrl}/admin/montantTotalOT`);
  }
}
