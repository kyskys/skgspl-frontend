import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy, AfterViewInit, QueryList } from '@angular/core';
import {appInjector} from '../util/AppInjector';

import { AdDirective } from './AdDirective';
import { AdItems } from './AdItems';
import { AdComponent } from './AdComponent';


@Component({
	selector: 'ad-component',
	template: '<ng-template ad-host></ng-template>'
})
export class AbstractDynamicLoadingComponent implements OnInit, OnDestroy {
	private ads: AdItems[];
	currentAdIndex = -1;
	@ViewChild(AdDirective) adHost: AdDirective;
	//private adHost: AdDirective;
	@Input('data') data: any;
	interval: any;

	constructor(private componentFactoryResolver: ComponentFactoryResolver ) {
		
	 }

	/*ngAfterViewInit() {
		this.hosts.changes.subscribe((comps: QueryList<AdDirective>)=> {
			this.adHost=comps.first;
			console.log(this.adHost);
		});*/
		ngOnInit() {
		this.ads=this.data;
		this.loadComponent();
		this.getAds();
	}

	ngOnDestroy() {
		clearInterval(this.interval);
	}

	loadComponent() {
		this.currentAdIndex = (this.currentAdIndex + 1) % this.ads.length;
		let adItem = this.ads[this.currentAdIndex];

		let componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
		console.log(this.ads);

		let viewContainerRef = this.adHost.viewContainerRef;
		viewContainerRef.clear();

		let componentRef = viewContainerRef.createComponent(componentFactory);
		(<AdComponent>componentRef.instance).inputData = adItem.data;
	}

	getAds() {
		this.interval = setInterval(() => {
			this.loadComponent();
		}, 3000);
	}

	setAds(ads: AdItems[]) {
		this.ads = ads;
	}
}