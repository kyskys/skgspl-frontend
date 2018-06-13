import { Component, Input, Output, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy, AfterViewInit, QueryList, EventEmitter } from '@angular/core';
import { appInjector } from '../util/AppInjector';

import { AdDirective } from './AdDirective';
import { AdItems } from './AdItems';
import { AdComponent } from './AdComponent';

import { EventEnum, EventCarrier } from '../util/EventCarrier';


@Component({
	selector: 'ad-component',
	template: '<ng-template ad-host></ng-template>'
})
export class AbstractDynamicLoadingComponent implements OnInit, OnDestroy {
	private ads: AdItems[];
	currentAdIndex = -1;
	@ViewChild(AdDirective) adHost: AdDirective;
	@Input('data') data: any;
	@Output() events: EventEmitter<EventCarrier> = new EventEmitter<EventCarrier>();


	constructor(private componentFactoryResolver: ComponentFactoryResolver) {

	}

	ngOnInit() {
		this.reloadComponents();
	}

	ngOnDestroy() {
		this.adHost.viewContainerRef.clear();
	}

	loadComponent() {
		this.currentAdIndex = (this.currentAdIndex + 1) % this.ads.length;
		let adItem = this.ads[this.currentAdIndex];

		let componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);

		let viewContainerRef = this.adHost.viewContainerRef;

		viewContainerRef.clear();

		let componentRef = viewContainerRef.createComponent(componentFactory);

		componentRef.instance.outputData.subscribe(carrier => this.sendEvents(carrier));

		(<AdComponent>componentRef.instance).inputData = adItem.data;
	}


	reloadComponents() {
		this.ads = this.data;
		this.loadComponent();
	}

	sendEvents(carrier: EventCarrier) {
		this.events.emit(carrier);
	}

}