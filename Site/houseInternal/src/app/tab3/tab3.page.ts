import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor() {}
    
    var data = {
        "last_name" : "John",
        "first_name" : "Doe",
        "date" : "Jan 1, 2013",
        "football" : "Off",
        "baseball" : "Yes",
        "basketball" : "Off",
        "hockey" : "Yes",
        "nascar" : "Off"
    };
}
