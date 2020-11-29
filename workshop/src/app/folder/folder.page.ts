import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-folder',
    templateUrl: './folder.page.html',
    styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
    public folder: string;

    constructor( private activatedRoute: ActivatedRoute, private httpClient: HttpClientModule ) { }

    ngOnInit() {
        this.folder = this.activatedRoute.snapshot.paramMap.get('id');
        this.amITrue = true;
        this.emps = [
            { Name: "John", Date: "10/01/20", Location: "GA" },
            { Name: "Tyler", Date: "10/01/20", Location: "GA" }
        ];
    }

    public amITrue: boolean;
    public emps;

    public setTrue() 
    {
        if ( this.amITrue ) 
        {
            this.amITrue = false;
        }
        else 
        {
            this.amITrue = true;
        }
    }

    public removeEmp(e) {
        console.log( e );
        console.log( this.httpClient );
    }
    
    public getDoors()
    {
         this.httpClient.get( 'http://10.0.0.32:3000/open',{} ).subscribe( data => {
             console.log( data );
             console.log( data['message'] );
        });
    }
    
}
