import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-headervisit',
  templateUrl: './headervisit.component.html',
  styleUrls: ['./headervisit.component.css']
})
export class HeadervisitComponent implements OnInit {

  constructor(private router: Router) { }

  url:any
  ngOnInit(): void {
    this.url = this.router.url
  }

}
