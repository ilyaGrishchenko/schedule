import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Personal } from "../interfaces/personal";

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  private url = 'http://schedule.back/personal';

  constructor(private http: HttpClient) { }

  public getData(): Observable<Personal[]> {
    return this.http.get<Personal[]>(this.url, { withCredentials: false });
  }

  public saveData(data: Personal[]): Observable<Personal[]> {
    console.log('POST');
    console.log(data);
    return this.http.post<Personal[]>(this.url, { data: data });
  }
}
