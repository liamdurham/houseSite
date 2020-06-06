import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public http: HttpClient) {}
  
  ngOnInit()
  {
  
  }

   public dataObj = [ 
       {data: '0', message: 'master'},
       {data: '1', message:  'garage'},
       {data: '1', message:  'livingRm'},
       {data: '1', message:  'topPorch'},
       {data: '1', message:  'office'},
       {data: '1', message:  'frontDoor'},
       {data: '0', message:  'bedrm'},
       {data: '0', message:  'stairs'},
       {data: '0', message:  'bsmtOffice'},
       {data: '0', message:  'bsmtMain'},
       {data: '1', message:  'bsmtMud'},
       {data: '1', message:  'bsmtPorch'},
       ];
       
   public dataObj2 = [ 
       {data: '0', message: 'master'},
       {data: '0', message:  'garage'},
       {data: '0', message:  'livingRm'},
       {data: '0', message:  'topPorch'},
       {data: '0', message:  'office'},
       {data: '0', message:  'frontDoor'},
       {data: '0', message:  'bedrm'},
       {data: '0', message:  'stairs'},
       {data: '0', message:  'bsmtOffice'},
       {data: '0', message:  'bsmtMain'},
       {data: '0', message:  'bsmtMud'},
       {data: '0', message:  'bsmtPorch'},
       ];

  public openGarageDoor()
  { 
    this.http.get('http://10.0.0.32:3000/open',{}).subscribe( data => {
    console.log(data);
    console.log(data['message']);
    });
  }
  
  public infoGarageDoor()
  { 
    this.http.get('http://10.0.0.32:3000/info',{}).subscribe( data => {
    console.log(data);
    });
  }
  
  public pollUpdates()
  {
    window['_gotSomething'](this.dataObj);
  }
  
  public fakeUpdates()
  {
    window['_gotSomething'](this.dataObj2);
  }
}
