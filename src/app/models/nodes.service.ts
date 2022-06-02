import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Nodes } from './nodes.model';
import { Request } from './request.model';

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


  //request service
  makePinRequest(data:Request):Observable<Request>{
    return this.http.post<Request>(this.ROOT_URL+'pins/request',data)
  }

  getMyRequests(auth_token: any){

    const headers  = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.http.get(this.ROOT_URL+'pins/myrequests' ,{ headers: headers  })
  }
  
}
