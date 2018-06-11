import { ViewChild,ElementRef,Component } from '@angular/core';
import { TimetableItem } from '../entity/TimetableItem';
import { GroupService } from '../service/GroupService';
import { SubjectService } from '../service/SubjectService';
import { UserService } from '../service/UserService';
import { SelectItem } from 'primeng/api';
import {AbstractDynamicLoadingComponent} from '../component/AbstractDynamicLoadingComponent';
import {TimetableModalComponent} from '../component/TimetableModalComponent';
import {AdItems} from '../component/AdItems';
import { AdDirective } from '../component/AdDirective';

@Component({
	selector: 'app-timetable',
	templateUrl: './timetable.component.html',
	styleUrls: ['./timetable.component.css']
})
export class TimetableComponent {

	@ViewChild("addRowDiv") addRowDiv:ElementRef;

	subjectService: SubjectService = new SubjectService();
	groupService: GroupService = new GroupService();
	userService: UserService = new UserService();
	days: string[] = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница"];
	lessons: TimetableItem[] = TimetableItem[20];
	groups: SelectItem[] = [];
	lecturers: SelectItem[] = [];
	subjects: SelectItem[] = [];
	filteredSubjects: SelectItem[] = [];
	display=false;
	lecturer: any;
	room:any;
	rooms: SelectItem[] = [{label:"1",value:1},{label:"2",value:2},{label:"3",value:3}];
	items:AdItems[] =  [new AdItems(TimetableModalComponent,{lecturers:this.lecturers,rooms:this.rooms})];
	constructor() {
		this.lessons = [
			{ subject: "1", lecturer: "1", room: "1" }, { subject: "2", lecturer: "2", room: "2" }, { subject: "3", lecturer: "3", room: "3" }, { subject: "4", lecturer: "4", room: "4" },
			{ subject: "5", lecturer: "5", room: "5" }, { subject: "6", lecturer: "6", room: "6" }, { subject: "7", lecturer: "7", room: "7" }, { subject: "8", lecturer: "8", room: "8" },
			{ subject: "9", lecturer: "9", room: "9" }, { subject: "10", lecturer: "10", room: "10" }, { subject: "11", lecturer: "11", room: "11" }, { subject: "12", lecturer: "12", room: "12" },
			{ subject: "13", lecturer: "13", room: "13" }, { subject: "14", lecturer: "14", room: "14" }, { subject: "15", lecturer: "15", room: "15" }, { subject: "16", lecturer: "16", room: "16" },
			{ subject: "17", lecturer: "17", room: "17" }, { subject: "18", lecturer: "18", room: "18" }, { subject: "19", lecturer: "19", room: "19" }, { subject: "20", lecturer: "20", room: "20" },
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
       let filtered : any[] = [];
        for(let i = 0; i < this.subjects.length; i++) {
            let subject = this.subjects[i];
            if(subject.label.toLowerCase().includes(event.query.toLowerCase()) == true) {
                filtered.push(subject);
            }
        }
        this.filteredSubjects = filtered;
    }

    check(event) {
    	var target = event.currentTarget;
    	var pElement = target.parentElement.parentElement;
    	var pClass = pElement.attributes.class;
    	console.log(this.lessons[0]);
    }

    displayModal() {
    	this.display=true;
    }

    removeElement(event) {
    	var target = event.currentTarget;
    	var pElement = target.parentElement;
    	pElement.remove();
    }

    addRow(event) {
    	this.items.push(new AdItems(TimetableModalComponent,{lecturers:[{label:"1",value:1},{label:"2",value:2},{label:"3",value:3}],rooms:this.rooms}));
    	//this.addRowDiv.nativeElement.insertAdjacentHTML('beforebegin','<p><p-dropdown [options]="lecturers" [(ngModel)]="lecturer"></p-dropdown><p-dropdown [options]="lecturers" [(ngModel)]="room"></p-dropdown><button (click)="removeElement($event)">X</button></p>');
    }


}