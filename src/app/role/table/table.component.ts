import { Component, OnInit,ViewChild } from '@angular/core';
import {RoleTableDto} from '../../entity/role/RoleTableDto';
import {RoleDto} from '../../entity/role/RoleDto';
import {AbstractListEditComponent} from '../../component/abstract-list-edit/abstract-list-edit.component';
import {DictionaryItem} from '../../entity/DictionaryItem';
import {RoleService} from '../../service/RoleService';
import {AuthorityService} from '../../service/AuthorityService';

@Component({
  selector: 'app-role-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class RoleTableComponent implements OnInit {

  @ViewChild(AbstractListEditComponent)
  list: AbstractListEditComponent; 

  roleService: RoleService = new RoleService();
  authorityService: AuthorityService = new AuthorityService();

  roles: RoleTableDto[];
  authorities: DictionaryItem[];

  selectedRoles:RoleTableDto[] = [];

  isModalDisplaying = false;

  availablePrivilegies: DictionaryItem[] = [];
  usedPrivilegies: DictionaryItem[] = [];

  currentRole: number;
  roleName:string;

  constructor() { }

  ngOnInit() {
    this.roleService.getAll().subscribe(data => {
      this.roles=data;
    });
    this.authorityService.getDictionary().subscribe(data => {
      this.authorities=data;
    });
  }


   isOneSelected():boolean {
      return this.selectedRoles.length!==0&&this.selectedRoles.length<2; 
    }

    isManySelected():boolean {
      return this.selectedRoles.length!==0;
    }

    createRole() {
      this.currentRole=-1;
      this.roleName="";
      this.availablePrivilegies = Object.assign([],this.authorities);
      this.usedPrivilegies=[];
      this.isModalDisplaying=true;
    }

    updateRole() {
      this.currentRole=this.selectedRoles[0].id;
      this.roleName=this.selectedRoles[0].name;
      this.authorityService.getDictionaryByRole(this.currentRole).subscribe(data => {
        this.usedPrivilegies=data;
      this.availablePrivilegies = Object.assign([],this.authorities).filter(available => {
        return !this.usedPrivilegies.some(used => used.id==available.id);
      });
      this.isModalDisplaying=true;
    });
    }

    deleteRole() {
      this.selectedRoles.forEach(role => {
        this.roleService.delete(role.id).subscribe(data => {
          console.log("deleted");
        });
      });
    }

    submit() {
        let role = new RoleDto();
        role.name=this.roleName;
        role.authorities = this.list.usedItems.map(value => value.id);
      if(this.currentRole!==-1) {
        this.roleService.update(role,this.currentRole).subscribe(data => {
          console.log("updated");
        });
      } else {
        this.roleService.create(role).subscribe(data => {
          console.log("created");
        });
      }
    }
}


