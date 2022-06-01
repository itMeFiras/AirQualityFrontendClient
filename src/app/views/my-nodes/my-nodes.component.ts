import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/models/users.service'; 

@Component({
  selector: 'app-my-nodes',
  templateUrl: './my-nodes.component.html',
  styleUrls: ['./my-nodes.component.css']
})
export class MyNodesComponent implements OnInit {

  constructor(private userService : UsersService) { }
  user:any

  ngOnInit(): void {
    this.getProfile()
  }

  getProfile(){
    var currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    var token = currentUser.token;

    this.userService.getprofile(token).subscribe(res => {
      if (res == "you dont have access" || res == "no token sent" ){
        window.location.href=`/`
      }
      else {
      this.user = res
      }
    })
  }

}
