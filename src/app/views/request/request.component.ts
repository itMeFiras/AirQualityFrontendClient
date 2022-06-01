import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/models/users.service';
import { NodesService } from 'src/app/models/nodes.service';
import { Request } from 'src/app/models/request.model';
import { Users } from 'src/app/models/users.model';


@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  constructor(private userService : UsersService, private NodesService:NodesService) { }
  user:any
  request: Request = new Request
  pname:any

  ngOnInit(): void {
    this.getProfile()
    console.log(this.user.username)
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
      this.pname = this.user[0].username
      }
    })
  }

  makeRequest(request : Request){
    this.NodesService.makePinRequest(request).subscribe((data : any) =>{
      request = data;
      window.location.href=`/myNodes`
    })
  }

}
