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
       this.stor.loadDataFromLocal();
       this.itemList = this.stor.currentItemList;
   }
    
   public itemList: Listobject[] = []; 
   public showUnfinishedFlag: boolean = false;    
    
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
       
    }
    
    public getColorForItem(status)
    {
        if(status  == false)
        {
            return 'dark';
        }
        else
        {
            return 'medium';
        }
    }
    
    public changeItemStatus(item)
    {
        
        this.stor.toggleItemStatus(item);
        this.getCurrentItems();
    }
    
    public removeItem(item)
    {
        this.stor.removeItem(item);   
        this.getCurrentItems();
    }
    
    public cascadeItem(item)
    {
        this.stor.cascadeItem(item);
        this.getCurrentItems();
    }
    
    public onSearch(ev)
    {
        this.stor.hideUnsearched(ev.srcElement.value);
    }
    
    public filterChanged(ev)
    {
        console.log(ev);
        if(ev.srcElement.value == 'unfinished')
        {
            this.stor.showOnlyUnfinished();
        }
        else if(ev.srcElement.value == 'finished')
        {
            this.stor.showOnlyFinished();   
        }
        else
        {
            this.stor.showAll(); 
        }
    }
    
}
