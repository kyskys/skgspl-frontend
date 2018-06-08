import { Injector } from '@angular/core';

export let appInjector: Injector;

export function setInjector(injector: Injector) {
	if (appInjector) {
        console.error('Programming error: AppInjector was already set');
    }
    else {
        appInjector = injector;
    }
}