import {TimetableRow} from '../entity/TimetableRow';

export class TimetableItem {
	time: number;
	date:number;
	subject: string;
	locations: TimetableRow[];
}