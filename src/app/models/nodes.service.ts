import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NodesService {

  readonly ROOT_URL = "http://localhost:8800/api/pins";

  constructor(private http : HttpClient) { }

  findall(): Observable<any> {
    return this.http.get(this.ROOT_URL).pipe()
   }
}
