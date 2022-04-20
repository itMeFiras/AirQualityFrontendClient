import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../models/users.service'
import { Users } from 'src/app/models/users.model';

@Component({
  selector: 'app-headeruser',
  templateUrl: './headeruser.component.html',
  styleUrls: ['./headeruser.component.css']
})
export class HeaderuserComponent implements OnInit {

  constructor(private usersService:UsersService) { }

  user: Users = new Users;
  ngOnInit(): void {
  }

  logout(){
    localStorage.removeItem('user');
    window.location.href="/"
  }
}
