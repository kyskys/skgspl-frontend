import { Component, OnInit,ViewChild } from '@angular/core';
import {DictionaryItem} from '../../entity/DictionaryItem';
import {UserService} from '../../service/UserService';
import {RoleService} from '../../service/RoleService';
import {AuthorityService} from '../../service/AuthorityService';
import {UserAuthoritiesDto} from '../../entity/user/UserAuthoritiesDto';
import {AbstractListEditComponent} from '../../component/abstract-list-edit/abstract-list-edit.component';

@Component({
  selector: 'app-user-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class UserTableComponent implements OnInit {

	@ViewChild(AbstractListEditComponent)
  list: AbstractListEditComponent; 

	isAuthoritiesModalDisplaying:boolean = false;

	userService: UserService = new UserService();
	roleService: RoleService = new RoleService();
	authorityService: AuthorityService = new AuthorityService();

	users:DictionaryItem[] = [];
	roles:DictionaryItem[] = [];
	authorities: DictionaryItem[] = [];

	authType:string = '';
	selectedRole:DictionaryItem = {id:-1,name:""};
	currentUser:DictionaryItem = {id:-1, name:""};

	availableAuthorities: DictionaryItem[] = [];
    usedAuthorities: DictionaryItem[] = [];

  constructor() { }

  ngOnInit() {
  	this.userService.getUserDictionary().subscribe(data => {
  		this.users=data;
  	});
  	this.roleService.getDictionary().subscribe(data => {
  		this.roles=data;
  	});
  	this.authorityService.getDictionary().subscribe(data => {
  		this.authorities=data;
  	});
  }

  updateAuthorities(rowIndex:number) {
  	this.currentUser = this.users[rowIndex];
  	this.userService.getUserAuthorities(this.currentUser.id).subscribe(data => {
  		let userAuthorities:UserAuthoritiesDto = data;
  		if(userAuthorities.role!==null) {
  			this.authType='role';
  			this.selectedRole=this.roles.find(role => role.id==userAuthorities.role);
  			this.usedAuthorities=[];
  			this.availableAuthorities=Object.assign([],this.authorities);
  	this.isAuthoritiesModalDisplaying=true;
  		} else if (userAuthorities.authorities!=null&&userAuthorities.authorities.length>0) {
  			this.authType='authority';
  			this.usedAuthorities=Object.assign([],this.authorities).filter(used => {
  				return userAuthorities.authorities.find(userAuth => userAuth == used.id);
  			});
      this.availableAuthorities = Object.assign([],this.authorities).filter(available => {
        		return !this.usedAuthorities.some(used => used.id==available.id);
      });
  	this.isAuthoritiesModalDisplaying=true;
  		}
  	});
  	
  	
  }

  submit() {
  	if(this.authType=='role') {
  		this.userService.updateUserRole(this.currentUser.id,this.selectedRole.id).subscribe(data => {
  			console.log("sucex role");}
  			);
  	} else if (this.authType=='authority') {
  		let authorities = this.list.usedItems.map(used => used.id);
  		this.userService.updateUserAuthorities(this.currentUser.id,authorities).subscribe(data => {
  			console.log("sucex auth");
  		});
  	}
  }
}
