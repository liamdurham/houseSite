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
export class AddItemModalComponent implements OnInit 
{

 constructor(public modalCtrl: ModalController,  public stor: StorageService) {
     
 }

  ngOnInit() 
  {
      this.currentItems = this.stor.currentItemList;
      this.currentPersons = this.stor.currentPersons;
  }
  public currentlySelectedPerson;  
  public currentItems: Listobject[] = [];
  public currentPersons = [];
  public newPersonFlag: boolean = false;  
    
  public comparePersonSelected(ev)
    {
        console.log(ev);
       if( (document.getElementById("itemAssignedTo") as HTMLTextAreaElement).value == 'new')
           {
               console.log('new person detected!');
               this.newPersonFlag = true;
           }
    }
  
  public onAddNewPerson()
  {
    var newPersonName = (document.getElementById("newPersonName") as HTMLTextAreaElement).value;
    this.stor.addPerson(newPersonName);
      this.currentPersons = this.stor.currentPersons;
      (document.getElementById("itemAssignedTo") as HTMLTextAreaElement).value = newPersonName;
    this.newPersonFlag = false;  
  }
    
  public onAddItemConfirmed()
  {   
    var newObjName = (document.getElementById("itemName") as HTMLTextAreaElement).value;
    var newObjAssignedTo = (document.getElementById("itemAssignedTo") as HTMLTextAreaElement).value;
    var newObjParent = (document.getElementById("itemParent") as HTMLTextAreaElement).value;
    var color = 'primary';
    var dupeCheck = this.stor.checkForDupes(newObjName);  
      console.log(dupeCheck);
    if(newObjName.length > 4)
    {
        if( dupeCheck.length == 0)
        {
            this.stor.addItem(newObjName,color,newObjParent,newObjAssignedTo);
            this.dismissModal();
        }
        else
        {
            this.triggerErrorMsg('That task already exists!');
        }
    }
    else
    {    
        this.triggerErrorMsg('Minimum 5 characters please!'); 
    }
  }
   
  public triggerErrorMsg(warningText)
  {
      (document.getElementById("taskNameWarning") as HTMLTextAreaElement).innerText  = warningText; 
      setTimeout(() => {this.hideErrorMsg()}, 1500);
  }

  public hideErrorMsg()
  {
      (document.getElementById("taskNameWarning") as HTMLTextAreaElement).innerText  = '';  
  }
  async dismissModal()
  {
      await this.modalCtrl.dismiss();
  }
    
}
