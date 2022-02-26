import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarcheeService {
  private apiServeUrl =environment.apiBaseUrl;

  constructor(private http: HttpClient) { }
}
