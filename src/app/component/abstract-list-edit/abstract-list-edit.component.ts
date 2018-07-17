import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {DictionaryItem} from '../../entity/DictionaryItem';

@Component({
  selector: 'app-abstract-list-edit',
  templateUrl: './abstract-list-edit.component.html',
  styleUrls: ['./abstract-list-edit.component.css']
})
export class AbstractListEditComponent implements OnInit {

  @Input() 
  set availableItems(items: DictionaryItem[]){
    this._availableItems = this.copyItems(items);
  }

  @Input() 
  set usedItems(items: DictionaryItem[]){
    this._usedItems = this.copyItems(items);
  }

  get availableItems():DictionaryItem[] {
    return this.copyItems(this._availableItems);
  }

  get usedItems():DictionaryItem[] {
    return this.copyItems(this._usedItems);
  }

	private _availableItems: DictionaryItem[] = [];
  private _usedItems:DictionaryItem[] = [];
	private selectedAvailableItems: DictionaryItem[] = [];
	private selectedUsedItems:DictionaryItem[] = [];

  constructor() { }

  test(event) {
    console.log(event);
  }

  ngOnInit() {
  	// this._availableItems=[{id:1,name:"role A"},{id:2,name:"role B"},{id:3,name:"role C"},
   //  {id:4,name:"role A"},{id:5,name:"role B"},{id:6,name:"role C"},
   //  {id:7,name:"role A"},{id:8,name:"role B"},{id:9,name:"role C"},
   //  {id:10,name:"role A"},{id:11,name:"role B"},{id:12,name:"role C"},
   //  {id:13,name:"role A"},{id:14,name:"role B"},{id:15,name:"role C"},
   //  {id:16,name:"role A"},{id:17,name:"role B"},{id:18,name:"role C"},
   //  {id:19,name:"role A"},{id:20,name:"role B"},{id:21,name:"role C"}];
  }

  private moveAvailableToUsed() {
  	for(let i=0;i<this.selectedAvailableItems.length;i++) {
  		this._usedItems = [...this._usedItems, this.selectedAvailableItems[i]];
  		let index = this._availableItems.indexOf(this.selectedAvailableItems[i]);
      this._availableItems.splice(index,1);
      this._availableItems = [...[],...this._availableItems];
  	}
  	this.selectedAvailableItems = [];
  }

  private moveUsedToAvailable() {
  	for(let i=0;i<this.selectedUsedItems.length;i++) {
  		this._availableItems = [...this._availableItems, this.selectedUsedItems[i]];
  		let index = this._usedItems.indexOf(this.selectedUsedItems[i]);
  		this._usedItems.splice(index,1);
      this._usedItems=[...[],...this._usedItems];
  	}
  	this.selectedUsedItems = [];
  }

  private moveAllAvailableToUsed() {
    this._usedItems = [...this._usedItems,...this._availableItems];
    this._availableItems= [];
  }

  private moveAllUsedToAvailable() {
    this._availableItems=[...this._availableItems,...this._usedItems];
    this._usedItems = [];
  }

  private copyItems(array:DictionaryItem[]):DictionaryItem[] {
    return array.map(item => {
      return Object.assign(new DictionaryItem(),item);
    });
  }
}
