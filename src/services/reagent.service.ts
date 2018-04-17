import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import {ApiService} from './api.service';
import {ReagentDetail, ReagentLabel} from '../classes/reagent';
import * as _ from 'lodash';
import {LabeledItemService} from '../classes/label';


@Injectable()
export class ReagentService implements LabeledItemService {


  constructor(
    private apiSvc: ApiService,
  ) {}

  removeLabel(reagent:ReagentDetail, label:ReagentLabel):Promise<void>{
    return this.apiSvc.get(`/reagent/${reagent.id}/label/remove/${label.id}/`).then(()=>{
      _.remove(reagent.labels,{
        id:label.id
      });
    });
  }

  addLabel(reagent:ReagentDetail, label:ReagentLabel):Promise<void>{
    return this.apiSvc.get(`/reagent/${reagent.id}/label/add/${label.id}/`).then(()=>{
      if (_.isUndefined(_.find(reagent.labels,{id:label.id}))) {
        reagent.labels.push(label);
      }
    });
  }

}
