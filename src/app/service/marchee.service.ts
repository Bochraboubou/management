import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Marchee } from '../model/Marchee';

@Injectable({
  providedIn: 'root'
})
export class MarcheeService {
  private apiServeUrl =environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  //ajouter marchee
  public addMarchee(organId:number,marchee:Marchee): Observable<Marchee>
  {
    return this.http.post<Marchee>(`${this.apiServeUrl}/admin/organisations/${organId}/marchees`,marchee);
  }

  //récuperer les marchees
  public getMarchees(organId:number): Observable<Marchee[]>
  {
    return this.http.get<Marchee[]>(`${this.apiServeUrl}/admin/organisations/${organId}/marchees`);
  }

   //récuperer le secteur par nom
   public getMarcheebyCode(codeMarchee:string): Observable<Marchee>
   {
     return this.http.get<Marchee>(`${this.apiServeUrl}/admin/marcheebycode/${codeMarchee}`);
   }
}
