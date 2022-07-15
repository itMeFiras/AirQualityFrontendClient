import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LatLngBounds, map, point } from 'leaflet'
import { NodesService } from 'src/app/models/nodes.service';
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
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  conf: IotMapConfig = new IotMapConfig();
  commonIotMap: IotMapManager = new IotMapManager(this.conf)
  iotMapMarkerManager: IotMapMarkerManager = new IotMapMarkerManager(this.commonIotMap, this.conf)
  iotMapClusterManager: IotMapClusterManager = new IotMapClusterManager(this.commonIotMap, this.conf)
  iotMapUserMarkerManager: IotMapUserMarkerManager = new IotMapUserMarkerManager(this.commonIotMap, this.conf)
  iotMapPathManager: IotMapPathManager = new IotMapPathManager(this.commonIotMap, this.conf)
  iotMapAreaManager: IotMapAreaManager = new IotMapAreaManager(this.commonIotMap, this.conf)
  title = 'IotMap';

  lists: any[] = [];
  constructor(private nodeservice : NodesService) { }

  ngOnInit(): void {
    this.getPins()

    this.conf.setConfig(
     {
       map : {defaultLat:36.8349084,defaultLng: 10.2432562,defaultZoomLevel: 13,}
     }
    )
  }

  clickednode : any
  clickedmac : any = null
  clickedinfo : any
    MAC:String=''
    co2:String=''
    light:String=''
    pm10:String=''
    pm25:String=''
    pressure:String=''
    sound:String=''
    temperature:String=''
    tvoc:String=''
    received_at:String=''

  nodeList :any = [] ;
  PoiID:string="";
  PoiName:string="";

  // get all the pins and add them to the static list 
  getPins(){
    this.nodeservice.findall().subscribe(pin => {
      console.log("1-------------------",pin);
      this.nodeList = pin;      

      for (var val of pin) {
        let a = {
          id: val._id,
          location: {
            lat: val.lat,
            lng: val.long
          },
          //template: 'square',
          layer: 'Active',
          status: 'neutiral', // 'warning','alert'
          // tab: {
          //   content: '<span class="iotmap-icons-vehicle"></span>'
          // },
          inner: {
            img: '',
            color: 'black'
          },
          popup: {
            title: val.title,
            body: val.desc,
          },
          shape: {
            type: ShapeType.circle,
            anchored: true,
            plain: true,
            color : "#ff7900",
          },
        }
        if (val.operate == "No"){
          a.shape.color = "#545454"
          a.layer = "Inactive"
          //a.inner.img = 'https://c.woopic.com/logo-orange.png'
        }
        if (val.active == "active"){
          this.markersList.push(a)
        }
        this.iotMapMarkerManager.updateAllMarkers(this.markersList)
        
      }
      console.log("22222222222222222");
      console.log(val);
   })
  }


  // static list of all marker types on the map
  markersList: IotMarker[] = [];

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
      console.log('map bounds changed: [' + coord.getNorthEast().lat + ', ' + coord.getNorthEast().lng + '] / [' + coord.getSouthWest().lat + ', ' + coord.getSouthWest().lng + ']')
    }


    this.commonIotMap.onEltClick = (event) =>{
      //console.log(event)
      this.nodeservice.findOne(event).subscribe(res => {
        this.clickednode = res
        console.log(this.clickednode)
        this.clickedmac = this.clickednode.MAC

        this.nodeservice.getLastData(this.clickedmac).subscribe(res => {
          this.clickedinfo = res[0]
          console.log(this.clickedinfo)
          this.co2 = this.clickedinfo.co2
          this.MAC= this.clickedinfo.MAC
          this.light= this.clickedinfo.light
          this.pm10= this.clickedinfo.pm10
          this.pm25= this.clickedinfo.pm25
          this.pressure= this.clickedinfo.pressure
          this.sound= this.clickedinfo.sound
          this.temperature= this.clickedinfo.temperature
          this.tvoc= this.clickedinfo.tvoc
          this.received_at = this.clickedinfo.received_at.slice(0,10)+' '+this.clickedinfo.received_at.slice(11,19)
        })
      })
    }
    

    this.commonIotMap.init('iotMap')
    this.iotMapMarkerManager.addMarkers(this.markersList)
    // Do the same when you want to override the zoom on a clicked cluster
    this.iotMapClusterManager.updateCluster('cluster 1', { markersArea: new LatLngBounds([44.880, 4.89], [44.885, 4.9])})
  }

}
