import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/models/users.service'; 
import { NodesService } from 'src/app/models/nodes.service';

@Component({
  selector: 'app-my-nodes',
  templateUrl: './my-nodes.component.html',
  styleUrls: ['./my-nodes.component.css']
})
export class MyNodesComponent implements OnInit {

  constructor(private userService : UsersService, private NodesService:NodesService) { }
  user:any
  requests:any
  node:any

  ngOnInit(): void {
    this.getProfile()
    this.geMyRequests()
    this.getMyNode()
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

  geMyRequests(){
    var currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    var token = currentUser.token;

    this.NodesService.getMyRequests(token).subscribe(res => {
      if (res == "you dont have access" || res == "no token sent" ){
        window.location.href=`/`
      }
      else {
      this.requests = res
      console.log("-----------")
      console.log(this.requests[0])
      }
    })
  }

  getMyNode(){
    var currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    var token = currentUser.token;

    this.NodesService.getPersonalNode(token).subscribe(res => {
      if (res == "you dont have access" || res == "no token sent" ){
        window.location.href=`/`
      }
      else {
      this.node = res
      console.log("node xD")
      console.log(this.node)
      }
    })
  }

}
