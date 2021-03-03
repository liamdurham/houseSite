import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService } from '../storage.service';
import { Listobject } from '../listobject';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-add-item-modal',
  templateUrl: './add-item-modal.component.html',
  styleUrls: ['./add-item-modal.component.scss'],
})
export class AddItemModalComponent implements OnInit {

 constructor(public modalCtrl: ModalController,  public stor: StorageService) {}

  ngOnInit() {
      this.currentItems = this.stor.currentItemList;
  }
  public currentItems: Listobject[] = [];
    
  public onAddItemConfirmed()
    {   
        var newObjName = (document.getElementById("itemName") as HTMLTextAreaElement).value;
        var newObjParent = (document.getElementById("itemParent") as HTMLTextAreaElement).value;
        var color = 'primary';
        this.stor.addItem(newObjName,color,newObjParent);
        this.dismissModal();
    }
    
  async dismissModal()
    {
        await this.modalCtrl.dismiss();
    }
    
}
