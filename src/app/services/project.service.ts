import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from "../interfaces/project";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private url = 'http://schedule.back/projects';

  constructor(private http: HttpClient) { }

  public getData(): Observable<Project[]> {
    return this.http.get<Project[]>(this.url, { withCredentials: false });
  }
}
