import { Inject } from '@angular/core';
import {HttpService} from '../service/HttpService';
import {Observable} from "rxjs/Rx";
//import {UserDetails} from '../entity/UserDetails';
//import {RoleEnum} from '../entity/RoleEnum';
import { DictionaryItem } from '../entity/DictionaryItem';
import {AbstractService} from './AbstractService';

export class UserService extends AbstractService {
	url: string = "http://localhost:8080/rest/api/user/";

	/*getCurrentUserName():Observable<string> {
		return this.http.doGet(this.url+"name");
	}

	getCurrentUserRole():Observable<string> {
		return this.http.doGet(this.url+"role")
	}

	getUserDetails():Observable<UserDetails> {
		return this.http.doGet(this.url+"profile/details/");
	}

	updateUserDetails(body: UserDetails):Observable<UserDetails> {
		return this.http.doPost(this.url+"profile/details/", body);
	}

	loadRole():Observable<any> {
		return this.http.doGet(this.url+"role");
	}*/

	getLecturerDictionary(): Observable<DictionaryItem[]> {
		return this.getHttpService().doGet(this.url + "lecturer/dictionary");
	}
}