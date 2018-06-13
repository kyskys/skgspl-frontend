import { ViewChild, ElementRef, Component } from '@angular/core';
import { TimetableItem } from '../entity/TimetableItem';
import { GroupService } from '../service/GroupService';
import { SubjectService } from '../service/SubjectService';
import { UserService } from '../service/UserService';
import { SelectItem } from 'primeng/api';
import { AbstractDynamicLoadingComponent } from '../component/AbstractDynamicLoadingComponent';
import { TimetableModalComponent } from '../component/TimetableModalComponent';
import { AdItems } from '../component/AdItems';
import { AdDirective } from '../component/AdDirective';
import { EventCarrier, EventEnum } from '../util/EventCarrier';
import {TimetableRow} from '../entity/TimetableRow';

@Component({
	selector: 'app-timetable',
	templateUrl: './timetable.component.html',
	styleUrls: ['./timetable.component.css']
})
export class TimetableComponent {

	@ViewChild("addRowDiv") addRowDiv: ElementRef;
	@ViewChild(AbstractDynamicLoadingComponent) component:AbstractDynamicLoadingComponent;

	subjectService: SubjectService = new SubjectService();
	groupService: GroupService = new GroupService();
	userService: UserService = new UserService();
	days: string[] = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница"];
	lessons: TimetableItem[] = TimetableItem[20];
	groups: SelectItem[] = [];
	lecturers: SelectItem[] = [{ label: "lect a", value: 1 }, { label: "lect b", value: 2 }, { label: "lect c", value: 3 }];
	subjects: SelectItem[] = [];
	rooms: SelectItem[] = [{ label: "1", value: 1 }, { label: "2", value: 2 }, { label: "3", value: 3 }];
	filteredSubjects: SelectItem[] = [];
	display = false;
	lecturer: any;
	room: any;
	rowIndex: number;
	items: AdItems[] = [new AdItems(TimetableModalComponent, { lecturers: this.lecturers, rooms: this.rooms, display: false, array:[] })];;
	constructor() {
		this.lessons = [
			{ subject: "1", rows:[{lecturer:1,room:1}] }, 
		];
		this.subjectService.getDictionary().subscribe(data => {
			data.map(subject => {
				this.subjects.push({ label: subject.name, value: subject.id });
			});
		});
		this.groupService.getDictionary().subscribe(data => {
			data.map(group => {
				this.groups.push({ label: group.name, value: group.id });
			});
		});
		this.userService.getLecturerDictionary().subscribe(data => {
			data.map(lecturer => {
				this.lecturers.push({ label: lecturer.name, value: lecturer.id });
			});
		});
	}


	search(event) {
		let filtered: any[] = [];
		for (let i = 0; i < this.subjects.length; i++) {
			let subject = this.subjects[i];
			if (subject.label.toLowerCase().includes(event.query.toLowerCase()) == true) {
				filtered.push(subject);
			}
		}
		this.filteredSubjects = filtered;
	}

	check(event) {
		console.log(this.lessons[0]);
	}

	displayModal(i) {
		this.rowIndex = i;
		this.items[0].data.array = this.copyRowsValues();
		this.items[0].data.display = true;
		this.component.loadComponent();
	}

	receiveEvents(event) {
		if (event.type == EventEnum.SUBMIT) {
			this.lessons[this.rowIndex].rows = event.data;
		}
	}

	getLecturerById(id: number): string {
		for(let i=0;i<this.lecturers.length;i++) {
			if(new Number(this.lecturers[i].value)==id) {
				return this.lecturers[i].label;
			}
		}
	}

	getRoomById(id: number): string {
		for(let i=0;i<this.rooms.length;i++) {
			if(new Number(this.rooms[i].value)==id) {
				return this.rooms[i].label;
			}
		}
	}

	copyRowsValues():TimetableRow[] {
		let array: TimetableRow[] = [];
		this.lessons[this.rowIndex].rows.map(row => {
			let target:TimetableRow = new TimetableRow();
			Object.assign(target, row);
			array.push(target);
		});
		return array;
	}
}