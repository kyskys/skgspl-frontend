import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AccordionModule } from 'primeng/components/accordion/accordion';
import { PanelModule } from 'primeng/components/panel/panel';
import { ButtonModule } from 'primeng/components/button/button';
import { RadioButtonModule } from 'primeng/components/radioButton/radioButton';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TimetableComponent } from './timetable/timetable.component';


import { HttpService } from './service/HttpService';
import { Injector } from '@angular/core';
import { setInjector } from './util/AppInjector';



@NgModule({
	declarations: [AppComponent, TimetableComponent],
	imports: [
		HttpClientModule,
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		AccordionModule,
		PanelModule,
		ButtonModule,
		RadioButtonModule,
		TableModule,
		DropdownModule,
	],
	providers: [HttpService],
	bootstrap: [AppComponent]
})

export class AppModule {
	constructor(injector: Injector) {
		setInjector(injector);
	}
}
