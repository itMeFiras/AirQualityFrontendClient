import { Component } from '@angular/core';
import { UsersService } from 'src/app/models/users.service'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Frontend';

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
