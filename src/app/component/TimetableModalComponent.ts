import { Component, Input, Output } from '@angular/core';
 
import { AdComponent }      from './adComponent';
 
@Component({
  template: `
    <p>
    	<p-dropdown [options]="inputData.lecturers" [(ngModel)]="lecturer"></p-dropdown>
    	<p-dropdown [options]="inputData.rooms" [(ngModel)]="room"></p-dropdown>
    	<button (click)="removeElement($event)">X</button>
    </p>
  `
})
export class TimetableModalComponent implements AdComponent {
  @Input() inputData: any;
 
  @Output() outputData: any;

  removeElement(event) {
    	var target = event.currentTarget;
    	var pElement = target.parentElement;
    	pElement.remove();
    }
}