import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {AbstractListItem} from '../../entity/AbstractListItem';

@Component({
  selector: 'app-abstract-list-edit-component',
  templateUrl: './abstract-list-edit-component.component.html',
  styleUrls: ['./abstract-list-edit-component.component.css']
})
export class AbstractListEditComponentComponent implements OnInit {

  @Input() inputUsed: AbstractListItem[] = [];

  @Input() inputAvailable: AbstractListItem[] = [];

  @Output() outputUsed: EventEmitter<AbstractListItem[]> = new EventEmitter<AbstractListItem[]>();

  @Output() outputAvailable: EventEmitter<AbstractListItem[]> = new EventEmitter<AbstractListItem[]>();


	availableItems: AbstractListItem[] = [];
	selectedAvailableItems: AbstractListItem[] = [];
	usedItems:AbstractListItem[] = [];
	selectedUsedItems:AbstractListItem[] = [];

  constructor() { }

  ngOnInit() {
    this.availableItems =this.inputAvailable;
    this.usedItems =this.inputUsed;
  	/*this.availableItems=[{id:1,name:"role A"},{id:2,name:"role B"},{id:3,name:"role C"},
    {id:4,name:"role A"},{id:5,name:"role B"},{id:6,name:"role C"},
    {id:7,name:"role A"},{id:8,name:"role B"},{id:9,name:"role C"},
    {id:10,name:"role A"},{id:11,name:"role B"},{id:12,name:"role C"},
    {id:13,name:"role A"},{id:14,name:"role B"},{id:15,name:"role C"},
    {id:16,name:"role A"},{id:17,name:"role B"},{id:18,name:"role C"},
    {id:19,name:"role A"},{id:20,name:"role B"},{id:21,name:"role C"}]*/
  }

  moveAvailableToUsed() {
  	for(let i=0;i<this.selectedAvailableItems.length;i++) {
  		this.usedItems = [...this.usedItems, this.selectedAvailableItems[i]];
  		let index = this.availableItems.indexOf(this.selectedAvailableItems[i]);
      this.availableItems.splice(index,1);
      this.availableItems = [...[],...this.availableItems];
  	}
  	this.selectedAvailableItems = [];
    this.inputAvailable = this.availableItems;
  }

  moveUsedToAvailable() {
  	for(let i=0;i<this.selectedUsedItems.length;i++) {
  		this.availableItems = [...this.availableItems, this.selectedUsedItems[i]];
  		let index = this.usedItems.indexOf(this.selectedUsedItems[i]);
  		this.usedItems.splice(index,1);
      this.usedItems=[...[],...this.usedItems];
  	}
  	this.selectedUsedItems = [];
    this.inputAvailable = this.availableItems;
  }

  moveAllAvailableToUsed() {
    this.usedItems = [...this.usedItems,...this.availableItems];
    this.availableItems= [];
  }

  moveAllUsedToAvailable() {
    this.availableItems=[...this.availableItems,...this.usedItems];
    this.usedItems = [];
  }

  emitAvailable() {
    this.outputAvailable.emit(this.availableItems);
  }

  emitUsed() {
    this.outputUsed.emit(this.usedItems);
  }
}
