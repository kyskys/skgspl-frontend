import { Component, OnInit,ViewChild } from '@angular/core';
import {RoleTableDto} from '../../entity/role/RoleTableDto'
import {AbstractListEditComponent} from '../../component/abstract-list-edit/abstract-list-edit.component';
import {DictionaryItem} from '../../entity/DictionaryItem';

@Component({
  selector: 'app-roletable',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class RoleTableComponent implements OnInit {

  @ViewChild(AbstractListEditComponent)
  list: AbstractListEditComponent; 

  roles: RoleTableDto[];

  selectedRoles:RoleTableDto[] = [];

  isModalDisplaying = true;

  availablePrivilegies: DictionaryItem[] = [];
  usedPrivilegies: DictionaryItem[] = [];

  currentRole: RoleTableDto;

  constructor() { }

  ngOnInit() {
    this.roles=[{id:1,name:"role A"},{id:2,name:"role B"},{id:3,name:"role C"},
    {id:4,name:"role A"},{id:5,name:"role B"},{id:6,name:"role C"},
    {id:7,name:"role A"},{id:8,name:"role B"},{id:9,name:"role C"},
    {id:10,name:"role A"},{id:11,name:"role B"},{id:12,name:"role C"},
    {id:13,name:"role A"},{id:14,name:"role B"},{id:15,name:"role C"},
    {id:16,name:"role A"},{id:17,name:"role B"},{id:18,name:"role C"},
    {id:19,name:"role A"},{id:20,name:"role B"},{id:21,name:"role C"}];
    this.availablePrivilegies=[{id:1,name:"priv A"},{id:2,name:"priv B"},{id:3,name:"priv C"},
    {id:4,name:"priv A"},{id:5,name:"priv B"},{id:6,name:"priv C"},
    {id:7,name:"priv A"},{id:8,name:"priv B"},{id:9,name:"priv C"}];
  }


   isOneSelected():boolean {
      return this.selectedRoles.length!==0&&this.selectedRoles.length<2; 
    }

    isManySelected():boolean {
      return this.selectedRoles.length!==0;
    }

    createRole() {
      this.currentRole=new RoleTableDto();
      this.usedPrivilegies=[];
      this.isModalDisplaying=true;
    }

    updateRole() {
      this.currentRole=Object.assign(new RoleTableDto(),this.selectedRoles[0]);
      this.usedPrivilegies=[{id:1,name:"priv A"},{id:2,name:"priv B"},{id:3,name:"priv C"}];
      this.isModalDisplaying=true;
    }

    modalSubmitAction() {

    }

    receiveChanges(event) {
      this.list.getUsedItems;
    }
}
