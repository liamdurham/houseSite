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
            var result;
            for(var  i = 0; i <  this.currentItemList.length; i += 1) 
            {
                result = this.findNode(parent, this.currentItemList[i]);
                if(result)
                {
                    result.Children.push(newItem);
                }
            } 
            console.log(result);
            return;   
        }
        else
        {
            console.log(this.currentItemList);
            this.currentItemList.push(newItem);
        }
    }
    
    public toggleItemStatus(item)
    {
        var result;
        for(var  i = 0; i <  this.currentItemList.length; i ++) 
        {
           result = this.findNode(item.Name, this.currentItemList[i]);
            console.log(result);
            if(result)
            {
                if(result.Name == item.Name)
                {
                    result.Status = !result.Status;
                    return;
                }
            }
        } 
        return;     
    }
    
    
    public findNode(name, currentNode) 
    {
        var i,
            currentChild,
            result;
        if(currentNode)
        {
            if (name == currentNode.Name) 
            {
                return currentNode;
            } 
        else 
        {
            for (i = 0; i <= currentNode.Children.length; i ++) 
            {
                currentChild = currentNode.Children[i];
                
                result = this.findNode(name, currentChild);

                if (result) 
                {
                    return result;
                }
            }
           result = false;   
        }
        result = false;  
      }
    }
}
