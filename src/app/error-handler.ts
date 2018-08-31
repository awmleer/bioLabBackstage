import {ErrorHandler, Inject, Injector, NgZone} from '@angular/core';
import {ApiError} from '../classes/error';
import {NzMessageService} from 'ng-zorro-antd';
import {environment} from '../environments/environment';

export class BiolabErrorHandler implements ErrorHandler {
  constructor(
    @Inject(NgZone) private ngZone: NgZone,
    @Inject(Injector) private injector: Injector,
  ){}

  private get messageSvc(): NzMessageService {
    return this.injector.get(NzMessageService);
  }

  handleError(error) {
    this.ngZone.run(() => {
      console.error(error);
      if (!environment.production) {
        console.error(error);
      }
      if(error.rejection){
        error = error.rejection;
      }
      if(error instanceof ApiError){
        this.messageSvc.create('error', error.message);
      }
    });
  }
}
