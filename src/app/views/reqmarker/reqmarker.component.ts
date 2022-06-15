import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LatLngBounds, map, point } from 'leaflet'
import {
  IotMapManager,
  IotMarker,
  ShapeType,
  IotMapConfig,
  TabType,
  IotMapMarkerManager,
  IotMapClusterManager,
  IotMapUserMarkerManager,
  IotMapPathManager,
  IotMapAreaManager
} from 'iotmapmanager'

@Component({
  selector: 'app-reqmarker',
  templateUrl: './reqmarker.component.html',
  styleUrls: ['./reqmarker.component.css']
})

export class ReqmarkerComponent implements AfterViewInit {
  conf: IotMapConfig = new IotMapConfig();
  commonIotMap: IotMapManager = new IotMapManager(this.conf)
  iotMapMarkerManager: IotMapMarkerManager = new IotMapMarkerManager(this.commonIotMap, this.conf)
  iotMapClusterManager: IotMapClusterManager = new IotMapClusterManager(this.commonIotMap, this.conf)
  iotMapUserMarkerManager: IotMapUserMarkerManager = new IotMapUserMarkerManager(this.commonIotMap, this.conf)
  iotMapPathManager: IotMapPathManager = new IotMapPathManager(this.commonIotMap, this.conf)
  iotMapAreaManager: IotMapAreaManager = new IotMapAreaManager(this.commonIotMap, this.conf)
  title = 'IotMap';

  lists: any[] = [];
  centerMarkerLat:any
  centerMarkerLng:any
  constructor() { }

  ngOnInit(): void {
    this.conf.setConfig(
     { map : {defaultLat:36.8349084,defaultLng: 10.2432562} }
    )
  }

  markersList: IotMarker[] = []

  ngAfterViewInit (): void {
    this.conf.setConfig({
      markerTemplates: {
        'vehicle': {
          layer: 'vehicles',
          shape: {
            type: ShapeType.circle,
            anchored: true,
            plain: true
          },
          inner: {
            icon: 'iotmap-icons-vehicle'
          }
        }
      },
      map: {
        externalClustering: false,
        layerControl: true,
        exclusiveLayers: false
      },
      layerTemplates: {
        'etablissementssss': {
          content: '<span class="iotmap-icons-School"></span>',
          type: TabType.normal,
          popupColNumber: 2
        },
        'meters': {
          content: '<img width=16 src="../assets/icons/check_your_balance.svg">'
        },
        'autos': {
          content: '<span class="iotmap-icons-4g"></span>',
          type: TabType.large
        }
      },
      markerStatus: {
        'test': {
          name: {
            singular: 'test',
            plural: 'tests'
          },
          bullet: '<span style="color: #527EDB; font-size: 20px"> &#9678;  </span>',
          url: 'http://www.orange.com'
        }
      }
    })

    this.commonIotMap.onMove = () => {
      const coord = this.commonIotMap.getIotMap().getBounds()
      this.centerMarkerLat = this.commonIotMap.getIotMap().getCenter().lat
      this.centerMarkerLng = this.commonIotMap.getIotMap().getCenter().lng

      console.log(this.centerMarkerLat,this.centerMarkerLng)
      console.log('map bounds changed: [' + coord.getNorthEast().lat + ', ' + coord.getNorthEast().lng + '] / [' + coord.getSouthWest().lat + ', ' + coord.getSouthWest().lng + ']')
    }


    this.commonIotMap.onEltClick = (event) =>{
      const coord = this.commonIotMap.getIotMap().getCenter()
      console.log(coord.lat)
      console.log(event)    
    }
  

    this.commonIotMap.init('iotMap')
    this.iotMapMarkerManager.addMarkers(this.markersList)
    // Do the same when you want to override the zoom on a clicked cluster
    this.iotMapClusterManager.updateCluster('cluster 1', { markersArea: new LatLngBounds([44.880, 4.89], [44.885, 4.9])})
  }


}
