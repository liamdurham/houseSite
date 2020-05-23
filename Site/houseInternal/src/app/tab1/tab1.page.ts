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
  {}
  
  public openGarageDoor()
  {
    this.http.get('http://10.0.0.249:3000/open',{}).subscribe( data => {
    console.log(data);
    console.log(data['message']);
    });
  }
}
