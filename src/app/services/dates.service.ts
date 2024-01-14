import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatesService {

  private url = 'http://schedule.back/dates';

  constructor(private http: HttpClient) { }

  public getDates(): Observable<string[]> {
    return this.http.get<string[]>(this.url, { withCredentials: false });
  }
}
