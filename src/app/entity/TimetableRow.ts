import { SelectItem } from 'primeng/api';

export class TimetableRow {
	lecturer: number;
	room: number;

	constructor() {
		this.lecturer = -1;
		this.room = -1;
	}
}