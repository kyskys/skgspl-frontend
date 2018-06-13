import { Component, Input, Output, EventEmitter, AfterContentInit } from '@angular/core';

import { AdComponent } from './adComponent';

import { TimetableRow } from '../entity/TimetableRow';

import {EventCarrier,EventEnum} from '../util/EventCarrier';

@Component({
	template: `
<p-dialog header="Тут что-то будет" [(visible)]="inputData.display" [modal]="true" [responsive]="true" [width]="350" [minWidth]="250" [minY]="120">
  <div *ngFor="let row of rows; let i = index;">
    <p-dropdown [options]="inputData.lecturers" placeholder="Преподаватель" [(ngModel)]="rows[i].lecturer"></p-dropdown>
    <p-dropdown [options]="inputData.rooms" placeholder="Кабинет" [(ngModel)]="rows[i].room"></p-dropdown>
    <button (click)="removeElement(i)">X</button>
  </div>
  <button (click)="addRow($event)">+</button>
  <p-footer>
    <button type="button" pButton icon="pi pi-check" (click)="sendRows()" label="Submit"></button>
    <button type="button" pButton icon="pi pi-close" (click)="inputData.display=false" label="Cancel"></button>
  </p-footer>
</p-dialog>
  `
})
export class TimetableModalComponent implements AdComponent, AfterContentInit  {
	@Input() inputData: any;

	@Output() outputData: EventEmitter<EventCarrier> = new EventEmitter<EventCarrier>();

	rows: TimetableRow[] = [];

	constructor() {
		
	}

	ngAfterContentInit() {
		this.rows = this.inputData.array;
	}

	removeElement(i) {
		this.rows.splice(i, 1);
	}

	addRow(event) {
		this.rows.push(new TimetableRow());
	}

	sendRows() {
		this.inputData.display=false;
		this.outputData.emit(new EventCarrier(EventEnum.SUBMIT,this.rows));
	}

}
