import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import {ApiService} from './api.service';
import {InstrumentDetail, InstrumentEntry} from '../classes/instrument';
import * as _ from 'lodash';
import {Label, LabeledItemService} from '../classes/label';


@Injectable()
export class InstrumentService implements LabeledItemService {


  constructor(
    private apiSvc: ApiService,
  ) {}

  async instrumentList(pageNumber:number):Promise<InstrumentEntry[]>{
    return await this.apiSvc.get(`/instrument/list/${pageNumber}`);
  }

  instrumentDetail(id:number):Promise<InstrumentDetail>{
    return this.apiSvc.get(`/instrument/${id}/detail/`);
  }

  removeLabel(instrument:InstrumentDetail, label:Label):Promise<void>{
    return this.apiSvc.get(`/instrument/${instrument.id}/label/remove/${label.id}/`).then(()=>{
      _.remove(instrument.labels,{
        id:label.id
      });
    });
  }

  addLabel(instrument:InstrumentDetail, label:Label):Promise<void>{
    return this.apiSvc.get(`/instrument/${instrument.id}/label/add/${label.id}/`).then(()=>{
      if (_.isUndefined(_.find(instrument.labels,{id:label.id}))) {
        instrument.labels.push(label);
      }
    });
  }

}
