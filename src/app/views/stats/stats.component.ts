import { Component, OnInit } from '@angular/core';
import { NodesService } from 'src/app/models/nodes.service';
import { ActivatedRoute } from '@angular/router';
import { Nodes } from 'src/app/models/nodes.model';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  constructor(private nodeservice :NodesService, private route: ActivatedRoute) { }

  id: any
  node :any
  nodeByDate : any
  received_at:String=''
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getMacData()
  }

  getMacData(){
    this.nodeservice.getMacData(this.id).subscribe(res => {
      this.node = res
      console.log(this.node)
    })
  }

}
