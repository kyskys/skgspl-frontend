import { Inject } from '@angular/core';
//import {SearchableService} from '../search/SearchableService';
//import {AuthoritySearchParams} from'../search/params/AuthoritySearchParams';
//import {DataTableParams} from '../data-table';
import { HttpService } from '../service/HttpService';
import { Observable } from "rxjs/Rx";
//import {AuthorityMainDto} from '../entity/AuthorityMainDto';
//import {AuthorityDto} from '../entity/AuthorityDto';
import { DictionaryItem } from '../entity/DictionaryItem';
import {AbstractService} from './AbstractService';


export class AuthorityService extends AbstractService{//implements SearchableService<AuthoritySearchParams, AuthorityMainDto> {
	url: string = "http://localhost:8080/rest/api/authority/";

	/*get(id: number):Observable<AuthorityMainDto> {
		let resultUrl=this.url+id+"/";
		return this.http.doGet(resultUrl);
	}

	getAll():Observable<AuthorityMainDto[]> {
		return this.http.doGet(this.url+"all");
	}

	create(entity: AuthorityDto):Observable<AuthorityMainDto> {
		return this.http.doPut(this.url,entity);
	}

	delete(id: number):Observable<any> {
		return this.http.doDelete(this.url+id);
	}

	update(entity:AuthorityDto, id:number):Observable<any> {
		return this.http.doPost(this.url+id,entity);
	}
	
	addStudentsToAuthority(array: any, id:number):Observable<any> {
		return this.http.doPost(this.url+id+"/add/student", array);
	}*/

	getDictionary(): Observable<DictionaryItem[]> {
		return this.getHttpService().doGet(this.url + "dictionary");
	}

	getDictionaryByRole(id:number):Observable<DictionaryItem[]> {
		return this.getHttpService().doGet(this.url + "dictionary/role/"+id);
	}

	getDictionaryByUser(id:number):Observable<DictionaryItem[]> {
		return this.getHttpService().doGet(this.url+"dictionary/user/"+id);
	}
	/*
		getAuthoritysByPairId(id: number): Observable<AuthorityMainDto[]> {
			let result: string = this.url+"pair/"+id;
			return this.http.doGet(result);
		}
	
		getAuthoritysWithoutPair(id: number): Observable<AuthorityMainDto[]> {
			let result: string = this.url+"nopair/"+id;
			return this.http.doGet(result);
		}
	
		search(searchParams: AuthoritySearchParams, dataParams: DataTableParams): Observable<AuthorityMainDto[]> {
			let resultUrl: string = this.url;
			resultUrl+="search?limit="+dataParams.limit+"&sort="+dataParams.sortBy+"&offset="+dataParams.offset+"&asc="+dataParams.sortAsc;
			if(searchParams.id!==undefined&&searchParams.id>0) {
				resultUrl+="&id="+searchParams.id;
			}
			if(searchParams.name!==undefined&&searchParams.name!=="") {
				resultUrl+="&name="+searchParams.name;
			}
			return this.http.doGet(resultUrl);
		}
	
		count(params: AuthoritySearchParams): Observable<number> {
			let resultUrl: string = this.url+"count";
			let first: boolean=false;
			if(params.id!==undefined&&params.id>0) {
				resultUrl+="?id="+params.id;
				first=true;
			}
			if(params.name!==undefined&&params.name!=="") {
				resultUrl+=(first?"&":"?")+"name="+params.name;
			}
			return this.http.doGet(resultUrl);
		}*/
}
