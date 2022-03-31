import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Type } from '../model/Type';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  private apiServeUrl =environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public addType(metierId:number,type:Type): Observable<Type>
  {
    return this.http.post<Type>(`${this.apiServeUrl}/admin/metier/${metierId}/type`,type);
  }

  public getTypessByMetier(metierId:number): Observable<Type[]>
  {
    return this.http.get<Type[]>(`${this.apiServeUrl}/admin/metier/${metierId}/types`);
  }

   //récuperer le type par nom
   public getTypebyLib(typeLib:string): Observable<Type>
   {
     return this.http.get<Type>(`${this.apiServeUrl}/admin/typebylib/${typeLib}`);
   }

   //récuperer le type par ArticleId
   public getTypebyArticleId(articleId:number): Observable<Type>
   {
     return this.http.get<Type>(`${this.apiServeUrl}/admin/typebyArticle/${articleId}`);
   }
 
}
