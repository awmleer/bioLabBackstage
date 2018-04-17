import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import {ApiService} from './api.service';
import {PaperDetail, PaperLabel} from '../classes/paper';
import * as _ from 'lodash';
import {LabeledItemService} from '../classes/label';


@Injectable()
export class PaperService implements LabeledItemService {


  constructor(
    private apiSvc: ApiService,
  ) {}

  getPaperDetail(id:number):Promise<PaperDetail>{
    return this.apiSvc.get(`/paper/${id}/detail/`);
  }

  removeLabel(paper:PaperDetail, label:PaperLabel):Promise<void>{
    return this.apiSvc.get(`/paper/${paper.id}/label/remove/${label.id}/`).then(()=>{
      _.remove(paper.labels,{
        id:label.id
      });
    });
  }

  addLabel(paper:PaperDetail, label:PaperLabel):Promise<void>{
    return this.apiSvc.get(`/paper/${paper.id}/label/add/${label.id}/`).then(()=>{
      if (_.isUndefined(_.find(paper.labels,{id:label.id}))) {
        paper.labels.push(label);
      }
    });
  }

}
