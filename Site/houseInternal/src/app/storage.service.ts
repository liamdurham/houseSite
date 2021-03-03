import { Injectable } from '@angular/core';
import { Listobject } from './listobject';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
    
  public currentItemList: Listobject[] = [];    
    
  public addItem(name, color, parent)
    {
        
        var newItem = {
                    Name: name,
                    Status: false,
                    Color: color,
                    Children: [],
                    Parent: parent
                    };
        if(parent !== 'none' )
        {
            this.currentItemList.forEach(function(item)
            {
                console.log(item.Name);
                console.log(parent);
                if(parent == item.Name && newItem.Name !== parent)
                {    
                    console.log('Item now a child');
                    item.Children.push(newItem);
                }
            });
        }
        else
        {
            console.log(this.currentItemList);
            this.currentItemList.push(newItem);
        }
    }
    
    public toggleItemStatus(item)
    {
            this.currentItemList.forEach(function(obj)
            {   
                if(obj.Name == item.Name) 
                {
                    obj.Status =  !obj.Status;
                    return;
                }
                else
                {
                    if(obj.Name  == item.Parent)
                    {
                        obj.Children.forEach(function(child)
                        {
                            child.Status = !child.Status;
                            return;
                        })
                    }
                }
            });
        
    }
}
