import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../models/users.service'
import { Users } from 'src/app/models/users.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private usersService:UsersService, private route: ActivatedRoute) { }

  user : any 
  currDiv: string | undefined
  alert :string | undefined
  newpass :string | undefined

  ngOnInit(): void {
    this.getProfile()
  }

  getProfile(){
    var currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    var token = currentUser.token; // your token

    this.usersService.getprofile(token).subscribe(res => {
      if (res == "you dont have access" || res == "no token sent" ){
        window.location.href=`/`
      }
      else {
        this.user = Object.values(res)[0]
        console.log(this.user._id)
      }
    })

    this.usersService.getUserById(this.user._id).subscribe(res => {
      this.user = res
    })
  }
  

  edit(divVal: string,user : Users){
    this.usersService.editUser(this.user._id,user).subscribe((data : any) =>{
      user = data;
      console.log(data)
      if (data.message == "email is used"){
        this.alert = "This email is already used !"
        this.currDiv = divVal;
      }
      else if (data.message == "edit success"){
        window.location.href='/profile'
      }
    })
  }

  editpass(divVal: string,user : Users){
    this.usersService.editPass(this.user._id,user).subscribe((data : any) =>{
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
