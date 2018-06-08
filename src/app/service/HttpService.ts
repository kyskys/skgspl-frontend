import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpService {

	constructor(private http: HttpClient) {

	}

    /*setAuthHeader() {
    	const options = {
    		headers: new HttpHeaders({
    			'Auth': this.auth.getToken()
    		})
    	}
        return options;
    }*/

	doGet(url: string): any {
		return this.http.get(url);//, {observe: "body", headers: {'Auth': this.auth.getToken()}});
	}

	doPost(url: string, body: any): any {
		return this.http.post(url, body);//, this.setAuthHeader());
	}

	doDelete(url: string): any {
		return this.http.delete(url);//,this.setAuthHeader());
	}

	doPut(url: string, body: any): any {
		return this.http.put(url, body);//,this.setAuthHeader());
	}
}