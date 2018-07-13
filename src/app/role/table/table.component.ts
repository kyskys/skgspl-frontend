import { Component, OnInit,ViewChild } from '@angular/core';
import {RoleTableDto} from '../../entity/role/RoleTableDto';

@Component({
  selector: 'app-roletable',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class RoleTableComponent implements OnInit {

  roles: RoleTableDto[];

  selectedRoles:RoleTableDto[] = [];

  isCreateModalDisplaying = true;

  testData = [];

  constructor() { }

  ngOnInit() {
    this.roles=[{id:1,name:"role A"},{id:2,name:"role B"},{id:3,name:"role C"},
    {id:4,name:"role A"},{id:5,name:"role B"},{id:6,name:"role C"},
    {id:7,name:"role A"},{id:8,name:"role B"},{id:9,name:"role C"},
    {id:10,name:"role A"},{id:11,name:"role B"},{id:12,name:"role C"},
    {id:13,name:"role A"},{id:14,name:"role B"},{id:15,name:"role C"},
    {id:16,name:"role A"},{id:17,name:"role B"},{id:18,name:"role C"},
    {id:19,name:"role A"},{id:20,name:"role B"},{id:21,name:"role C"}]
  }


   isOneSelected():boolean {
      return this.selectedRoles.length!==0&&this.selectedRoles.length<2; 
    }

    isManySelected():boolean {
      return this.selectedRoles.length!==0;
    }

    test() {
      console.log(this.roles);
    }
}
