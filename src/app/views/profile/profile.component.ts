import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/models/users.service'; 
import { Users } from 'src/app/models/users.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService : UsersService, private route: ActivatedRoute) { }

  id: any 
  user :any
  useredit :any
  url :string = '1'

  currDiv: string | undefined
  alert :string | undefined
  newpass :string | undefined

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
    this.getProfile();
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
