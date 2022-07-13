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

  findByMac(mac:string){
    return this.http.get<any[]>(this.ROOT_URL+'pins/getbymac?MAC='+ mac)
  }

  getLastData(mac : any): Observable<any>{
    return this.http.get(this.ROOT_URL+'node/lastmacdata?MAC='+mac)
  }

  getMacData(mac:any): Observable<any>{
    return this.http.get(this.ROOT_URL+'node/macdata2?mac='+mac)
  }


  //request service
  makePinRequest(auth_token: any,data:Request):Observable<Request>{
    const headers  = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.http.post<Request>(this.ROOT_URL+'pins/request2',data,{ headers: headers  })
  }

  getMyRequests(auth_token: any){

    const headers  = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.http.get(this.ROOT_URL+'pins/myrequests' ,{ headers: headers  })
  }

  getPersonalNode(auth_token: any){
    const headers  = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.http.get(this.ROOT_URL+'pins/node' ,{ headers: headers  })
  }
  
}
