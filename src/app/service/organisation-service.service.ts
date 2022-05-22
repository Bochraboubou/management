import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Organisation } from '../model/Organisation';

@Injectable({
  providedIn: 'root'
})
export class OrganisationServiceService {
  public apiServeUrl =environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public addOrganisation(organisation:Organisation): Observable<Organisation>
  {
    return this.http.post<Organisation>(`${this.apiServeUrl}/admin/organisations`,organisation);
  }

  public getOrganisations(): Observable<Organisation[]>
  {
    return this.http.get<Organisation[]>(`${this.apiServeUrl}/admin/organisations`);
  }

  public getOneOrganisation(organId:number): Observable<Organisation>
  {
    return this.http.get<Organisation>(`${this.apiServeUrl}/admin/oneorganisations/${organId}`);
  }


  //récuperer l'organisation par code
  public getOrganisationbyBonDeCommande(bcId:number): Observable<Organisation>
  {
    return this.http.get<Organisation>(`${this.apiServeUrl}/admin/organisationbyBonDeCommande/${bcId}`);
  }
//récuperer l'organisation par code != id !!

  public getOrganisationbyCode(codeOrgan:string): Observable<Organisation>
  {
    return this.http.get<Organisation>(`${this.apiServeUrl}/admin/organisationbyCode/${codeOrgan}`);
  }
  
  public getOrganisationbyCode2(codeOrgan:string): Observable<Organisation>
  {
    return this.http.get<Organisation>(`${this.apiServeUrl}/admin/orgbyCode/${codeOrgan}`);
  }
  // trouver par nom
  public getOrganisationbyNom(nomOrg:string): Observable<Organisation>
  {
    return this.http.get<Organisation>(`${this.apiServeUrl}/admin/organisationByNom/${nomOrg}`);
  }
// get an organisation By user id
  public getOrganisationbyUser(userid:number): Observable<Organisation>
  {
    return this.http.get<Organisation>(`${this.apiServeUrl}/admin/organisationByUser/${userid}`);
  }


  // get organisation by id 
  public getOrganisationbyId(id:number): Observable<Organisation>
  {
    return this.http.get<Organisation>(`${this.apiServeUrl}/admin/oneorganisations/${id}`);
  }

  // get an organisation By user Name
  public getOrganisationbyUserName(userName:string): Observable<Organisation>
  {
    return this.http.get<Organisation>(`${this.apiServeUrl}/admin/organisationbyUserName/${userName}`);
  }
  createOrganisation(formData:FormData): Observable<any> {
    return this.http.post(`${this.apiServeUrl}/admin/NewOrganisation`,formData);
  }

  public countEntreprises(orgId:number): Observable<any[]>
  {
    return this.http.get<any[]>(`${this.apiServeUrl}/admin/entreprises/organisation/${orgId}`);
  }
  
// get Organization and her employees
public CountUsersOfOrg(): Observable<any[]>
{
  return this.http.get<any[]>(`${this.apiServeUrl}/admin/getOrgAndUsersCHART`);
}
// trouver le nombre des marchee dans chaque organisation 
public CountMarcheesOfOrg(): Observable<any[]>
{
  return this.http.get<any[]>(`${this.apiServeUrl}/admin/getOrgAndMarcheeCHART`);
}
}
