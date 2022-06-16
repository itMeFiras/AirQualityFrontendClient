import { Component, OnInit } from "@angular/core";
import * as L from "leaflet";
//import "leaflet/dist/leaflet.css";

@Component({
  selector: 'app-reqmarker',
  templateUrl: './reqmarker.component.html',
  styleUrls: ['./reqmarker.component.css']
})

export class ReqmarkerComponent implements OnInit {
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

  ngOnInit() {
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
    });
  }
}