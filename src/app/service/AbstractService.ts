import {appInjector} from '../util/AppInjector';
import {HttpService} from './HttpService'

export class AbstractService {

	getHttpService() {
		return appInjector.get(HttpService);
	}

}