import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LatLngBounds } from 'leaflet'
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

  //IotMapConfig.setConfig(defaultLat:10)


  lists: any[] = [];
  constructor(private nodeservice : NodesService) { }

  ngOnInit(): void {
    this.getPins()
  }

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
          layer: 'Orange',
          status: 'active', // 'warning','alert'
          tab: {
            content: '<span class="iotmap-icons-vehicle"></span>'
          },
          inner: {
            label: 'aa',
            color: '#ff0000'
          },
          popup: {
            title: val.title,
            body: val.desc,
            //console.log(val._id)
          },
        }
        
        this.markersList.push(a)
        this.iotMapMarkerManager.updateAllMarkers(this.markersList)
        
      }
      console.log("22222222222222222");
      console.log(val);
   })
  }


  // static list of all marker types on the map
  markersList: IotMarker[] = [
    //poi
    {
      id: 's2',
      location: {
        lat: 44.895,
        lng: 4.875
      },
      popup: {
        title: 'Ecole Jean Rostand : <a href="http://www.google.fr"> test </a>',
        body: '<a href="https://bv.ac-grenoble.fr/carteforpub/uai/0260969M">ici</a>'
      },
      template: 'square',
      status: 'test', // 'neutral',
      tab: {
        content: 'POI',
        type: TabType.large
      }
    },

    //white-blue square
    {
      id: 's6',
      location: {
        lat: 44.895,
        lng: 4.895
      },
      template: 'square'
    },

    //orange logo
    {
      id: 's7',
      location: {
        lat: 44.895,
        lng: 4.885
      },
      shape: {
        type: ShapeType.square,
        anchored: true,
        plain: false // ,
        // accuracy: 200
      },
      inner: {
        img: 'https://c.woopic.com/logo-orange.png',
        color: 'green'
      },
      layer: 'etablissements',
      status: 'inactive'
    },
    
    //white-green square
    {
      id: 'p1',
      location: {
        lat: 44.890,
        lng: 4.870
      },
      shape: {
        type: ShapeType.square,
        anchored: false,
        plain: false
      },
      layer: 'etablissements',
      inner: {
        icon: 'iotmap-icons-School',
        color: 'blue'
      },
      status: 'positive'
    },

    //blue square
    {
      id: 'p2',
      location: {
        lat: 44.890,
        lng: 4.875
      },
      popup: {
        title: 'Title',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.'
      },
      shape: {
        type: ShapeType.square,
        anchored: true,
        plain: true
      },
      inner: {
        icon: 'iotmap-icons-School',
        color: 'navyblue'
      },
      layer: 'etablissements',
      status: 'neutral'
    },

    //yellow circle
    {
      id: 'p3',
      location: {
        lat: 44.890,
        lng: 4.880
      },
      template: 'monument',
      status: 'warning'
    },
    //red circle
    {
      id: 'p4',
      location: {
        lat: 44.890,
        lng: 4.885
      },
      template: 'monument',
      status: 'alert'
    },

    //gray square
    {
      id: 'p5',
      location: {
        lat: 44.890,
        lng: 4.890
      },
      shape: {
        type: ShapeType.square,
        anchored: true,
        plain: true,
        // accuracy: 300
      },
      layer: 'etablissements',
      inner: {
        icon: 'iotmap-icons-hospital',
        color: 'white'
      },
      status: 'inactive'
    },
    //black square
    {
      id: 'p6',
      location: {
        lat: 44.890,
        lng: 4.895
      },
      shape: {
        type: ShapeType.square,
        plain: true,
        anchored: false
      },
      layer: 'etablissements',
      inner: {
        icon: 'iotmap-icons-map_pin',
        color: 'white'
      }
    }
  ];



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

    

    this.commonIotMap.init('iotMap')
    this.iotMapMarkerManager.addMarkers(this.markersList)
    // Do the same when you want to override the zoom on a clicked cluster
    this.iotMapClusterManager.updateCluster('cluster 1', { markersArea: new LatLngBounds([44.880, 4.89], [44.885, 4.9])})
  }




}
