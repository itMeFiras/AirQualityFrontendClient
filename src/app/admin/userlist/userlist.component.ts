import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../models/users.service'

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  user:any

  constructor(private UsersService:UsersService) { }

  ngOnInit(): void {
    this.getUserList()
  }

  getUserList(){
    this.UsersService.getUserList().subscribe(res => {
      console.log(res)
      this.user = res
    } )
  }


}
