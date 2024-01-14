import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Button } from "../interfaces/button";
import { Buttons } from "../interfaces/button";

@Injectable({
  providedIn: 'root'
})
export class ButtonService {

  private url = 'http://schedule.back/buttons';

  constructor(private http: HttpClient) { }

  public getData(): Observable<Buttons> {
    return this.http.get<Buttons>(this.url, { withCredentials: false });
  }
}
