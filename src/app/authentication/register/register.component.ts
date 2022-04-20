import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../models/users.service'
import { Users } from 'src/app/models/users.model';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  submitted=false;

  constructor(private usersService:UsersService, private toastr:ToastrService, private router:Router) { }

  user: Users = new Users;

  ngOnInit(): void {
  }

  // show alert
  currDiv: string | undefined

  // register
  register(divVal: string,user : Users){
    this.usersService.register(user).subscribe((data : any) =>{
      user = data;
      this.currDiv = divVal;
    })
  }
}
