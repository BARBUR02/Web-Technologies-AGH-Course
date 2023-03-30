import { EventEmitter, Injectable} from "@angular/core";
import { Data } from "./data.model";

@Injectable()
export class ServiceMove{
   moveEmitter = new EventEmitter<{ header: string; desc: string; }>();
   
   Data: Data[]= [
    new Data('The Basics','Coree angular basics you have to know'
    ,'Angular is a framework that helps developer to create reactive, well designed sigle Page Apps, later you will need to understand basic concepts like components services and directives'),
    new Data('Components',
       'Components are a core concept for building Angular UIs and apps',
       'With components you can split logic (and markup into separate building blocks and then combine them in the process of building your own awesome app (or  interfaces)! )')
    
    ,
    new Data('Events','Event are important in Angular',
    'Event allow you to trigger code on demand, you can create your own events an emit them or use default set of events!'),
  ]

  getData(){
   return this.Data;
  }

}