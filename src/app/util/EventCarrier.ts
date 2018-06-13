export class EventCarrier {
	type: EventEnum;
	data: any;

	constructor(type: EventEnum, data: any) {
		this.type = type;
		this.data = data;
	}
}
export enum EventEnum {
	SUBMIT,
	CANCEL,
}