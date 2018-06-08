import { Component } from '@angular/core';
import {HttpService} from './service/HttpService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpService]
})

export class AppComponent {
	
  constructor(private http: HttpService) {
		
  	}
}
