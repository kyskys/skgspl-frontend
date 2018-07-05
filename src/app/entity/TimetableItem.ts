import {TimetableRow} from '../entity/TimetableRow';
import {SelectItem} from 'primeng/api';

export class TimetableItem {
	time: number;
	date:number;
	subject: SelectItem;
	locations: TimetableRow[];
}