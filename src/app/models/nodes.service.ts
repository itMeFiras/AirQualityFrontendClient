import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Nodes } from './nodes.model';

@Injectable({
  providedIn: 'root'
})
export class NodesService {

  readonly ROOT_URL = "http://localhost:8800/api/";

  constructor(private http : HttpClient) { }

  findall(): Observable<any> {
    return this.http.get(this.ROOT_URL+'pins').pipe()
   }

  findOne(id : any){
    return this.http.get(this.ROOT_URL+'pins/list/'+id)
  }

  getLastData(mac : any): Observable<any>{
    return this.http.get(this.ROOT_URL+'node/lastmacdata?MAC='+mac)
  }

  getMacData(mac:any): Observable<any>{
    return this.http.get(this.ROOT_URL+'node/macdata2?mac='+mac)
  }

  
}
