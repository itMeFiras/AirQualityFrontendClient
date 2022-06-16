import { Component, OnInit , AfterViewInit } from '@angular/core';
import { UsersService } from 'src/app/models/users.service';
import { NodesService } from 'src/app/models/nodes.service';
import { Request } from 'src/app/models/request.model';
import * as L from "leaflet";

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements AfterViewInit {

  constructor(private userService : UsersService, private NodesService:NodesService) { }
  user:any
  request: Request = new Request
  pname:any

//map configurations
  map: L.Map | L.LayerGroup<any> | undefined;
  coord:any
  myMarker:any
  markerIcon = {
    icon: L.icon({
      iconSize: [25, 35],
      iconAnchor: [10, 35],
      popupAnchor: [2, -40],
      // specify the path here
      iconUrl: /*"https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png"*/"../../../assets/newMa.png",
      //shadowUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-shadow.png"
    })
  };

  ngOnInit(): void {
    this.getProfile()
    this.locationMap()
  }

  ngAfterViewInit(){
    this.locationMap()
  }

  getProfile(){
    var currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    var token = currentUser.token;

    this.userService.getprofile(token).subscribe(res => {
      if (res == "you dont have access" || res == "no token sent" ){
        window.location.href=`/`
      }
      else {
      this.user = res
      this.pname = this.user[0].username
      }
    })
  }

  makeRequest(request : Request){
    var currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    var token = currentUser.token;

    this.NodesService.makePinRequest(token,request).subscribe((data : any) =>{
      request = data;
      console.log(data)
      window.location.href=`/myNodes`
    })
  }

  locationMap(){
    //map configurations
    this.map = L.map("map").setView([36.8349084,  10.2432562], 10);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.map.on("click", e => {
      if (this.coord !=null){
        this.map?.removeLayer(this.myMarker);
      }
      console.log(e); // get the coordinates
      this.coord = e
      this.myMarker = L.marker([this.coord.latlng.lat, this.coord.latlng.lng], this.markerIcon)
      this.map?.addLayer(this.myMarker);
      this.request.lat = this.coord.latlng.lat
      this.request.long = this.coord.latlng.lng
    });
  }

}
