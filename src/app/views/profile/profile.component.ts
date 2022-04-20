import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/models/users.service'; 

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

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
    this.getProfile();
    const useredit = this.user
  }

  // getProfile(){
  //   this.userService.getUserById(this.id).subscribe(res => {
  //     console.log(res)
  //     this.user = res
  //   })
  // }

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

}
