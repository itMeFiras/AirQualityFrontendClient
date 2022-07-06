import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NodesService } from 'src/app/models/nodes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-csv-download',
  templateUrl: './csv-download.component.html',
  styleUrls: ['./csv-download.component.css']
})
export class CsvDownloadComponent implements OnInit {

  constructor(private nodeservice :NodesService, private route: ActivatedRoute, private  datepipe: DatePipe) {}
  id: any
  node :any

  myDate = new Date()
  latest_date :any
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.latest_date =this.datepipe.transform(this.myDate, 'yyyy-MM-dd');
    this.getMacData()
  }

  getMacData(){
    this.nodeservice.getMacData(this.id).subscribe(res => {
      this.node = res    
    })
  }

  download(){
    let name = 'node '+this.id+' at '+this.latest_date
    this.downloadFile(this.node, name);
  }

  ConvertToCSV(objArray: string, headerList: string[]) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = 'S.No,';
    for (let index in headerList) {
     row += headerList[index] + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
     let line = (i+1)+'';
     for (let index in headerList) {
      let head = headerList[index];
      line += ',' + array[i][head];
     }
     str += line + '\r\n';
    }
    return str;
   }

   downloadFile(data:any, filename='data') {
    let csvData = this.ConvertToCSV(data, ['co2', 'light', 'pm10', 'pm25', 'pressure', 'sound', 'temperature', 'tvoc', 'received_at']);
    //console.log(csvData)
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
        dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

}
