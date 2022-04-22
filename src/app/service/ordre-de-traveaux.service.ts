import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrdreDeTraveaux } from '../model/OrdreDeTraveaux';

@Injectable({
  providedIn: 'root'
})
export class OrdreDeTraveauxService {
  private apiServeUrl =environment.apiBaseUrl;

  constructor(private http: HttpClient) { }
  
  //récuperer le total des montant des OT
  public getTotalMontantOT(bcId:number): Observable<number>
  {
    return this.http.get<number>(`${this.apiServeUrl}/admin/bondeCommande/${bcId}/montantTotalOT`);
  }

  //ajouter OT
  public addOT(bcId:number,OT:OrdreDeTraveaux): Observable<OrdreDeTraveaux>
  {
    return this.http.post<OrdreDeTraveaux>(`${this.apiServeUrl}/admin/bondecommande/${bcId}/ordreTraveaux`,OT);
  }

  //get OT by codeOT and BCId
  
   //récuperer la bc par code
   public getOTByCodeOTandBCId(codeOT:string,bcId:number): Observable<OrdreDeTraveaux>
   {
     return this.http.get<OrdreDeTraveaux>(`${this.apiServeUrl}/admin/OT/codeOT/${codeOT}/bcId/${bcId}`);
   }
}
