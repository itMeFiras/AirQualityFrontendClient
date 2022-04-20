import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../models/users.service'
import { Users } from 'src/app/models/users.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  constructor(private usersService:UsersService) { }

  user: Users = new Users;

  ngOnInit(): void {
  }

  // show alert
  currDiv: string | undefined

  //resetpass
  resetpass(divVal: string,user : Users){
    this.usersService.resetpass(user).subscribe((data : any) =>{
      user = data;
      this.currDiv = divVal;
    })
  }

}
