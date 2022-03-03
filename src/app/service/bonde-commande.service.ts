import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BondeCommande } from '../model/BondeCommande';

@Injectable({
  providedIn: 'root'
})
export class BondeCommandeService {
  private apiServeUrl =environment.apiBaseUrl;

  constructor(private http: HttpClient) { }
  public addBondeCommande(marcheeId:number,entrepId:number,bc:BondeCommande): Observable<BondeCommande>
  {
    return this.http.post<BondeCommande>(`${this.apiServeUrl}/admin/marchees/${marcheeId}/bondescommandes/${entrepId}`,bc);
  }
}
