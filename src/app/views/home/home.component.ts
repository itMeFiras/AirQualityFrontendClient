import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/models/users.service'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /////////////
  constructor(private userService : UsersService) { }
  profile : any

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile(){
    var currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    var token = currentUser.token;

    this.userService.getprofile(token).subscribe(res => {
      if (res == "you dont have access" || res == "no token sent" ){
        this.profile = 0
      }
      else {
        this.profile = 1
      }
    })
  }

}
