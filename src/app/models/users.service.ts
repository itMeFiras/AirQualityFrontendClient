import { Injectable } from '@angular/core';
import { Users } from './users.model';
import { Observable } from "rxjs";
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  selectedUser : Users = {
    _id:'',
    username : '',
    firstname : '',
    lastname : '',
    email : '',
    password : '',
    active : '',
    node : '',
    messege:''
  }

  url : string = "http://localhost:8800/api/users" 

  constructor(private HttpClient: HttpClient) { }


  gettry(email: string) {
    return this.HttpClient.get<any[]>(`https://jsonplaceholder.typicode.com/users?email=${email}`);
  }


  //auth services
  register(data:any ) : Observable<Users>{
    let a = this.HttpClient.post<Users>(this.url+'/register',data)
    console.log(data)
    return a
  }

  login(data:Users) : Observable<Users>{
    return this.HttpClient.post<Users>(this.url+'/login',data)
  }

  resetpass(data:Users ) : Observable<Users>{
    return this.HttpClient.post<Users>(this.url+'/resetpass',data)
  }


  //user services
  getUserList(){
    return this.HttpClient.get(this.url+'/list2')
  }

  getprofile(auth_token: any){

    const headers  = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.HttpClient.get(this.url+'/profile' ,{ headers: headers  })
  }

  getUserById(id : any){
    return this.HttpClient.get(this.url+'/list/'+id)
  }

  getUserByname( name : any){
    return this.HttpClient.get<Users>(this.url+'/search',name)
  }

  getUserByemail( email : any){
    return this.HttpClient.get<any[]>(this.url+'/searchemail',email)
  }

  getemailparams( email : string){
    return this.HttpClient.get<any[]>(this.url+'/getbyemail?email='+ email)
  }

  getnameparams( name : string){
    return this.HttpClient.get<any[]>(this.url+'/getbyname?name='+ name)
  }

  deleteUser(id : any){
    return this.HttpClient.delete(this.url+'/deleteprofile/'+id)
  }

  editUser(id : any, data:Users ) : Observable<Users>{
    return this.HttpClient.post<Users>(this.url+'/editprofile2/'+id,data)
  }

  editPass(id : any, data:Users ) : Observable<Users>{
    return this.HttpClient.post<Users>(this.url+'/editprofilecheck/'+id,data)
  }
}
