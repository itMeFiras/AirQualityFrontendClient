import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../models/users.service'
import { Users } from 'src/app/models/users.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private usersService:UsersService) { }

  user: Users = new Users;
  currDiv: string | undefined
  alert :string | undefined
  ngOnInit(): void {
  }

  //login
  login(divVal: string,user : Users){
    this.usersService.login(user).subscribe((data : any) =>{
      user = data;

      if (data == "wrong user/pass"){
        this.alert = "Wrong username or password"
        this.currDiv = divVal;
      }

      else if (data == "this user is not active"){
        this.alert = "This account is not active, please check your email for confirmation link"
        this.currDiv = divVal;
      }
      
      else {
        localStorage.setItem('user', JSON.stringify({ token: data.accessToken, username: data.username }));
        if (data.role=="admin") { window.location.href="http://localhost:4201/"}
        else { window.location.href="/map"}
      }
    })
  }

}
