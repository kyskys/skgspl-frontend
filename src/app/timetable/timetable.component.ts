import { ViewChild, ElementRef, Component } from '@angular/core';
import { TimetableItem } from '../entity/TimetableItem';
import { GroupService } from '../service/GroupService';
import { LessonService } from '../service/LessonService';
import { SubjectService } from '../service/SubjectService';
import { RoomService } from '../service/RoomService';
import { UserService } from '../service/UserService';
import { SelectItem } from 'primeng/api';
import { AbstractDynamicLoadingComponent } from '../component/AbstractDynamicLoadingComponent';
import { TimetableModalComponent } from '../component/TimetableModalComponent';
import { AdItems } from '../component/AdItems';
import { AdDirective } from '../component/AdDirective';
import { EventCarrier, EventEnum } from '../util/EventCarrier';
import { TimetableRow } from '../entity/TimetableRow';
import * as moment from 'moment';

@Component({
	selector: 'app-timetable',
	templateUrl: './timetable.component.html',
	styleUrls: ['./timetable.component.css']
})
export class TimetableComponent {

	@ViewChild(AbstractDynamicLoadingComponent) component: AbstractDynamicLoadingComponent;

	subjectService: SubjectService = new SubjectService();
	groupService: GroupService = new GroupService();
	userService: UserService = new UserService();
	lessonService: LessonService = new LessonService();
	roomService: RoomService = new RoomService();
	daysOfWeek: string[] = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница"];
	dateFormat: any = "DD/MM/YYYY";
	dateWeek: any = "isoWeek";
	lessons: TimetableItem[] = Array<TimetableItem>();
	groups: SelectItem[] = [];
	lecturers: SelectItem[] = [];
	subjects: SelectItem[] = [];
	rooms: SelectItem[] = [];
	filteredSubjects: SelectItem[] = [];
	display = false;
	lecturer: any;
	room: any;
	rowIndex: number;
	items: AdItems[] = [new AdItems(TimetableModalComponent, { lecturers: this.lecturers, rooms: this.rooms, display: false, array: [] })];;
	weeks: SelectItem[] = [];
	selectedWeek: SelectItem;
	selectedGroup:SelectItem;

	constructor() {
		this.lessons.length = 20;
		this.clearTimetableData();
		this.generateDays();
		this.subjectService.getDictionary().subscribe(data => {
			data.forEach(subject => {
				this.subjects.push({ label: subject.name, value: subject.id });
			});
		});
		this.groupService.getDictionary().subscribe(data => {
			data.forEach(group => {
				this.groups.push({ label: group.name, value: group.id });
			});
		});
		this.userService.getLecturerDictionary().subscribe(data => {
			data.forEach(lecturer => {
				this.lecturers.push({ label: lecturer.name, value: lecturer.id });
			});
		});
		this.roomService.getDictionary().subscribe(data => {
			data.forEach(room => {
				this.rooms.push({ label: room.name, value: room.id });
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

	clearTimetableData() {
		for (let i = 0; i < this.lessons.length; i++) {
			this.lessons[i] = { subject: { label: "", value: 0 }, date: Math.floor(i / 4 + 1), time: i % 4 + 1, locations: [] };
		}
	}

	loadTimetableData() {
		this.clearTimetableData();
		this.lessonService.getTimetableByWeek(this.selectedWeek, this.selectedGroup).subscribe(data => {
			data.forEach(item => {
				let lesson = this.lessons.filter(lesson => lesson.date == item.date && lesson.time == item.time)[0];
				lesson.subject = this.getSubjectById(item.subject);
				lesson.locations = item.locations;
			});
		});
	}

	updateTimetable() {
		let startDay = moment().startOf(this.dateWeek).subtract(7,'d');
		let array = [];
		this.lessons.forEach(lesson => {
			if (lesson.locations.length!==0) {
				lesson.subject=lesson.subject.value;
				array.push(lesson);
			}
		});
		this.lessonService.updateTimetable(this.selectedWeek, this.selectedGroup, array);
	}

	downloadTimetablePDF() {
		this.lessonService.downloadTimetablePDF(this.selectedWeek).subscribe(res => {
			var binaryData = [];
			binaryData.push(res);
			var url = window.URL.createObjectURL(new Blob(binaryData, {type: "application/pdf"}));
        var a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.download = "raspisanie";
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove(); // remove the element
      }, error => {
        console.log('download error:', JSON.stringify(error));
      }, () => {
        console.log('Completed file download.')
      });
	}

	check() {
		console.log(this.lessons);
	}

	displayModal(i) {
		this.rowIndex = i;
		this.items[0].data.array = this.copyRowsValues();
		this.items[0].data.display = true;
		this.component.loadComponent();
	}

	receiveEvents(event) {
		if (event.type == EventEnum.SUBMIT) {
			this.lessons[this.rowIndex].locations = event.data;
		}
	}

	getLecturerById(id: number): string {
		for (let i = 0; i < this.lecturers.length; i++) {
			if (new Number(this.lecturers[i].value) == id) {
				return this.lecturers[i].label;
			}
		}
	}

	getRoomById(id: number): string {
		for (let i = 0; i < this.rooms.length; i++) {
			if (new Number(this.rooms[i].value) == id) {
				return this.rooms[i].label;
			}
		}
	}

	getSubjectById(id: number): SelectItem {
		for (let i = 0; i < this.subjects.length; i++) {
			if (new Number(this.subjects[i].value) == id) {
				return this.subjects[i];
			}
		}
	}

	copyRowsValues(): TimetableRow[] {
		return this.lessons[this.rowIndex].locations.map(row => {
			return Object.assign(new TimetableRow(), row);
		});
	}

	generateDays() {
		let startDay = moment().startOf(this.dateWeek).add(35, 'd');
		let endDay = moment().endOf(this.dateWeek).add(35, 'd');
		for (var i = 0; i <= 8; i++) {
			this.weeks.push(
				{ label: startDay.subtract(7, 'd').format(this.dateFormat) + " - " + endDay.subtract(7, 'd').format(this.dateFormat), value: startDay.format(this.dateFormat) });
		}
	}



	clearRow(i) {
		this.lessons[i] = { subject: { label: "", value: 0 }, date: Math.floor(i / 4 + 1), time: i % 4 + 1, locations: [] };
	}

}