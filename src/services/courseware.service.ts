import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {BioFile} from '../classes/courseware';

@Injectable()
export class CoursewareService {
  constructor(
    private apiSvc: ApiService,
  ) {}

  mkdir(parent: BioFile, name: string): Promise<number> {
    return this.apiSvc.post(`/courseware/mkdir/`, {
      name,
      parentId: parent.id
    });
  }

  ls(folderId: number = null): Promise<BioFile[]> {
    return this.apiSvc.get(`/courseware/ls/`, {
      folderId
    });
  }

}
