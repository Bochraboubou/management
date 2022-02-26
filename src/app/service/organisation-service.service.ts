import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Organisation } from '../model/Organisation';

@Injectable({
  providedIn: 'root'
})
export class OrganisationServiceService {
  private apiServeUrl =environment.apiBaseUrl;

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
}
