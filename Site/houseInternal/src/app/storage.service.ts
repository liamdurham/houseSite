import { Injectable, OnInit} from '@angular/core';
import { Listobject } from './listobject';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
    
  public currentItemList: Listobject[] = [];        
  public subItemList: Listobject[] = [];  
  public currentPersons = [];  
    
    
  //load data from localstorage
  
  public loadDataFromLocal()
    {
            
      if(localStorage.getItem('currentItemList').length > 0)
      {
          this.currentItemList = JSON.parse(localStorage.getItem('currentItemList'));
      }
      if(localStorage.getItem('currentPersons').length > 0)
      {
          this.currentPersons = JSON.parse(localStorage.getItem('currentPersons'));
      } 
    }
    
  public addPerson(name)
  {
    this.currentPersons.push({Name: name, Status: 'Active'});
    localStorage.setItem('currentPersons',JSON.stringify(this.currentPersons));
  }
    
  public addItem(name, color, parent, assignedTo)
  {
        var date = new Date().toLocaleDateString();
        console.log(date);
        var newItem = {
                    Name: name,
                    Status: false,
                    Color: color,
                    Children: [],
                    Parent: parent,
                    Visible: true,
                    AssignedDate: date,
                    AssignedTo: assignedTo,
                    ChildrenVisible: true
                    };
        if(parent !== 'none' )
        {
            var result;
            for(var  i = 0; i <  this.currentItemList.length; i += 1) 
            {
                result = this.findNode(parent, 'Name' ,this.currentItemList[i]);
                if(result)
                {
                    result.Children.push(newItem);
                }
            } 
            console.log(result);
              
        }
        else
        {
            
            this.currentItemList.push(newItem);
        }
      localStorage.setItem('currentItemList',JSON.stringify(this.currentItemList));
    }
    
    public checkForDupes(name)
    {  
       var holder: Listobject[] = this.findAllNodesWith(name, 'Name', this.currentItemList, this.strictMatch);
       return holder;    
    }
    
    
    public hideUnsearched(searchTerm)
    {
        if(searchTerm.length > 1)
        {
            
            var hideHolder: Listobject[] = this.findAllNodesWithout(searchTerm,'Name',this.currentItemList, this.partialMatch);
         
            hideHolder.forEach(function(item)
            {
                item.Visible = false;
            });   
            var showHolder: Listobject[] = this.findAllNodesWith(searchTerm,'Name',this.currentItemList,this.partialMatch);
        
            showHolder.forEach(function(item)
            {
                item.Visible = true;
            }); 
            console.log(showHolder);
        }
        else
        {
            var holder: Listobject[] = this.findAllNodesWith(false,'Visible',this.currentItemList,this.strictMatch);
             console.log(holder);
            holder.forEach(function(item)
            {
                item.Visible = true;
            });   
        }
    }
    
    public strictMatch( searchingFor, objectSearched)
    {
        if (searchingFor === objectSearched)
        {
            return true;
        }
        return false;
    }
    
    public partialMatch( searchingFor, objectSearched)
    {
        if(objectSearched.toLowerCase().indexOf(searchingFor.toLowerCase()) > -1)
        {
            return true;
        }
        return false;         
    }
    
    // true shows finished
    public showOnlyFinished()
    {
        var holder: Listobject[] = this.findAllNodesWith(true,'Status',this.currentItemList, this.strictMatch);
        holder.forEach(function(item)
        {
            item.Visible  = true;
        });
        var holder: Listobject[] = this.findAllNodesWith(false,'Status',this.currentItemList, this.strictMatch);
        holder.forEach(function(item)
        {
            item.Visible  = false;
        });
    }
  
    
    public showOnlyUnfinished()
    {
        var holder: Listobject[] = this.findAllNodesWith(false,'Status',this.currentItemList, this.strictMatch);
        holder.forEach(function(item)
        {
            item.Visible  = true;
        });
        var holder: Listobject[] = this.findAllNodesWith(true,'Status',this.currentItemList, this.strictMatch);
        holder.forEach(function(item)
        {
            item.Visible  = false;
        });
    }
    
    public showAll()
    {
        var holder: Listobject[] = this.findAllNodesWith(false,'Status',this.currentItemList, this.strictMatch);
        holder.forEach(function(item)
        {
            item.Visible  = true;
        });
        var holder: Listobject[] = this.findAllNodesWith(true,'Status',this.currentItemList, this.strictMatch);
        holder.forEach(function(item)
        {
            item.Visible  = true;
        });
    }
    
    public toggleItemStatus(item)
    {
        var result;
        for(var  i = 0; i <  this.currentItemList.length; i ++) 
        {
           result = this.findNode(item.Name, 'Name', this.currentItemList[i]);
            
            if(result)
            {
                if(result.Name == item.Name)
                {
                    result.Status = !result.Status;
                   
                }
            }
        }
        if(item.Children.length > -1)
        {
            var holder: Listobject[] = this.findAllNodesWith(!result.Status,'Status', result.Children, this.strictMatch);
            holder.forEach(function(item)
            {
                    item.Status = result.Status;
            });
        }
        return;     
    }
    
    public removeItem(item)
    {
        var result;
        for(var  i = 0; i <  this.currentItemList.length; i ++) 
        {
            if(item.Parent !== 'none')
            {
                result = this.findNode(item.Parent, 'Name', this.currentItemList[i]);
                console.log(result);
                if(result)
                {
                    if(result.Name == item.Parent)
                    {
                        result.Children = result.Children.filter(function(el) { return el.Name != item.Name; });
                        return;
                    }
                }
            }
            else
            {
                if (this.currentItemList[i].Name == item.Name)
                {
                    this.currentItemList.splice(i, 1);
                    return;
                }
            }
        } 
        return;  
    }
    
    public findNode(matchValue, matchField, currentNode) 
    {
        var i,
            currentChild,
            result;
        if(currentNode)
        {
            if (matchValue == currentNode[matchField]) 
            {
                return currentNode;
            } 
            else 
            {
                for (i = 0; i <= currentNode.Children.length; i ++) 
                {
                    currentChild = currentNode.Children[i];

                    result = this.findNode(matchValue, matchField, currentChild);

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
    
    public findMultipleNodes(matchValue, matchField, currentNode, matchFunc, inverse) 
    {       
        var i,
            currentChild,
            result;
        if(currentNode)
        {
            if(!inverse)
            {    
                if (matchFunc(matchValue,currentNode[matchField]))
                {
                    this.subItemList.push(currentNode);
                }
            }
            else
            {
                if (!matchFunc(matchValue,currentNode[matchField]))
                {
                    this.subItemList.push(currentNode);
                }
            }
            for (i = 0; i <= currentNode.Children.length; i ++) 
            {
                currentChild = currentNode.Children[i];
                this.findMultipleNodes(matchValue, matchField, currentChild, matchFunc, inverse);
            }
            
        }
    } 
    
    public  cascadeItem(startingNode)
    {
        if( startingNode.ChildrenVisible == true && startingNode.Children.length > -1)
        {
            var holder: Listobject[] = this.findAllNodesWith(true,'Visible', startingNode.Children, this.strictMatch);
            holder.forEach(function(item)
            {
                item.Visible = false;
            });
            startingNode.ChildrenVisible = false;
            console.log(holder);
        }
        else if(startingNode.Children.length > -1)
        {
            var holder: Listobject[] = this.findAllNodesWith(false,'Visible',startingNode.Children, this.strictMatch);
            holder.forEach(function(item)
            {
                item.Visible = true;
            });
            startingNode.ChildrenVisible = true; 
            console.log(holder);
        }
       return;
    }
    
    
    
    public findAllNodesWith(matchValue, matchField, targetList, matchFunc) 
    {
        this.subItemList.length = 0;
        if(targetList !== [])
        {
            for(var  i = 0; i <  targetList.length; i ++) 
            {
                this.findMultipleNodes(matchValue, matchField, targetList[i], matchFunc, false);
            } 
        }
      return this.subItemList;    
    }
    
    
    
    public findAllNodesWithout(matchValue, matchField, targetList, matchFunc) 
    {
        this.subItemList.length = 0;
        if(targetList !== [])
        {
            for(var  i = 0; i <  targetList.length; i ++) 
            {
                this.findMultipleNodes(matchValue, matchField, targetList[i], matchFunc, true);
            } 
        }
      return this.subItemList;    
    }

    
    
    
}
