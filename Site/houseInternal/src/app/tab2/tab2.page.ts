import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddItemModalComponent } from '../add-item-modal/add-item-modal.component';
import { Listobject } from '../listobject';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

   constructor(public modalCtrl: ModalController, public stor: StorageService) {}

   ngOnInit(){
       this.itemList = this.stor.currentItemList;
   }
    
   public itemList: Listobject[] = []; 
    
   async presentModal() 
    {
    const modal = await this.modalCtrl.create({
      component: AddItemModalComponent,
    });
    modal.onDidDismiss().then(() => {
       this.getCurrentItems(); 
    });    
    return await modal.present();
  }

    public getCurrentItems()
    {
        this.itemList = this.stor.currentItemList;
        console.log(this.itemList);
    }
    
    public getColorForItem(status)
    {
        if(status  == false)
        {
            return 'danger';
        }
        else
        {
            return 'success';
        }
    }
    
    public changeItemStatus(item)
    {
        
        this.stor.toggleItemStatus(item);
        this.getCurrentItems();
    }
}
