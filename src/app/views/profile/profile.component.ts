import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/models/users.service'; 
import { NodesService } from 'src/app/models/nodes.service';
import { Users } from 'src/app/models/users.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService : UsersService, private route: ActivatedRoute, private NodesService:NodesService) { }

  id: any 
  user :any
  useredit :any
  url :string = '1'

  currDiv: string | undefined
  alert :string | undefined
  newpass :string | undefined

  node :any
  i :any
  j :any
  k :any

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
    this.getProfile();
    this.getMyNode();
    const useredit = this.user
  }

  getProfile(){
    var currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    var token = currentUser.token; // your token

    this.userService.getprofile(token).subscribe(res => {
      if (res == "you dont have access" || res == "no token sent" ){
        window.location.href=`/`
      }
      else {
        this.user = Object.values(res)[0]
        this.user.password =""
        console.log(this.user._id)
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
        this.i = 0
        this.j = 0 
        this.k = 0
        for (let r of this.node){
          this.i=this.i+1
          if (r.operate == "Yes")this.j=this.j+1
          if (r.operate == "No")this.k=this.k+1
        }
      }
    })
  }

  delete(){
    this.userService.deleteUser(this.id).subscribe()
    window.location.href=`/`
  }

  editpass(divVal: string,user : Users){
    this.userService.editPass(this.user._id,user).subscribe((data : any) =>{
      user = data;
      if (data.message == "the old password is wrong !"){
        this.alert = "The old password is wrong !"
        this.currDiv = divVal;
      }
      else if (data.message == "edit success"){
        window.location.href='/profile'
      }
    })
  }

}
