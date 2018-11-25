import { Injectable } from '@angular/core';

import {ApiService} from './api.service';
import {PaperDetail} from '../classes/paper';
import * as _ from 'lodash';
import {Label, LabeledItemService} from '../classes/label';


@Injectable()
export class PaperService implements LabeledItemService {


  constructor(
    private apiSvc: ApiService,
  ) {}

  getPaperDetail(id:number):Promise<PaperDetail>{
    return this.apiSvc.get(`/paper/${id}/detail/`);
  }

  removeLabel(paper:PaperDetail, label:Label):Promise<void>{
    return this.apiSvc.get(`/paper/${paper.id}/label/remove/${label.id}/`).then(()=>{
      _.remove(paper.labels,{
        id:label.id
      });
    });
  }

  addLabel(paper:PaperDetail, label:Label):Promise<void>{
    return this.apiSvc.get(`/paper/${paper.id}/label/add/${label.id}/`).then(()=>{
      if (_.isUndefined(_.find(paper.labels,{id:label.id}))) {
        paper.labels.push(label);
      }
    });
  }

  removePaper(paperId: number): Promise<void> {
    return this.apiSvc.post(`/paper/${paperId}/remove/`);
  }

  async addPaper(data): Promise<number> {
    const res = await this.apiSvc.post('/paper/add/', data);
    return res.paperId;
  }

}
