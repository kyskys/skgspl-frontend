import {EventCarrier} from '../util/EventCarrier';
import {EventEmitter} from '@angular/core';

export interface AdComponent {
   inputData: any;
 
  outputData: EventEmitter<EventCarrier>;
}