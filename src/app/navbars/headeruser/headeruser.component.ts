import { Component, OnInit, Input } from '@angular/core';
import {UsersService} from '../../models/users.service'
import { Users } from 'src/app/models/users.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-headeruser',
  templateUrl: './headeruser.component.html',
  styleUrls: ['./headeruser.component.css']
})
export class HeaderuserComponent implements OnInit {
  @Input() item :any
  constructor(private usersService:UsersService,private router: Router) { }

  user: Users = new Users;
  url:any
  randomColor:any
  ngOnInit(): void {
    this.url = this.router.url
    this.randomColor = '#'+this.intToRGB(this.hashCode(this.item))
  }

  logout(){
    localStorage.removeItem('user');
    window.location.href="/"
  }

  // color generation
  hashCode(str:any) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  } 
  intToRGB(i:any){
    var c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
  }

}
