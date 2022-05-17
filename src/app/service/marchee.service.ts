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
  public addMarchee(organId:number,metieeId:number,marchee:Marchee): Observable<Marchee>
  {
    return this.http.post<Marchee>(`${this.apiServeUrl}/admin/organisations/${organId}/marchees/${metieeId}`,marchee);
  }

  //récuperer les marchees
  public getMarchees(organId:number): Observable<Marchee[]>
  {
    return this.http.get<Marchee[]>(`${this.apiServeUrl}/admin/organisations/${organId}/marchees`);
  }

   //récuperer le marchee par code
   public getMarcheebyCode(codeMarchee:string): Observable<Marchee>
   {
     return this.http.get<Marchee>(`${this.apiServeUrl}/admin/marcheebycode/${codeMarchee}`);
   }

   //récuperer le marchee par Id
   public getMarcheebyId(idMarchee:number): Observable<Marchee>
   {
     return this.http.get<Marchee>(`${this.apiServeUrl}/admin/marcheebyId/${idMarchee}`);
   }

   //récuperer le marchee par code et organ id
   public getMarcheebyCodeandOrganisation(codeMarchee:string,organId:number): Observable<Marchee>
   {
     return this.http.get<Marchee>(`${this.apiServeUrl}/admin/marcheebycode/${codeMarchee}/andOrgan/${organId}`);
   }

   //récuperer les marchees par metierId and orgabId
   public getMarcheesbyMetierandOrganisation(metierId:number,organId:number): Observable<Marchee[]>
   {
     return this.http.get<Marchee[]>(`${this.apiServeUrl}/admin/marcheebyMetier/${metierId}/andOrgan/${organId}`);
   }

   //get marchee by organisation id
public getMarcheesbyorganisationId(organId:number): Observable<Marchee[]>
{
  return this.http.get<Marchee[]>(`${this.apiServeUrl}/admin/organisations/${organId}/marchees`);
}

   //get marchee with type'projet' by organisation id
public getMarcheestypeProjetbyorganisationId(organId:number): Observable<Marchee[]>
{
  return this.http.get<Marchee[]>(`${this.apiServeUrl}/admin/organisations/${organId}/marcheestypeProjet`);
}

 //get marchee with type'MC' by organisation id
 public getMarcheestypeMCbyorganisationId(organId:number): Observable<Marchee[]>
 {
   return this.http.get<Marchee[]>(`${this.apiServeUrl}/admin/organisations/${organId}/marcheestypeMC`);
 }

  // count marchees by metier
  public countMarcheeByMetier(orgId:number): Observable<Array<any>>
  {
    return this.http.get<Array<any>>(`${this.apiServeUrl}/admin/nombresMarcheesParMetier/organisation/${orgId}`);
  }

  
   


}
