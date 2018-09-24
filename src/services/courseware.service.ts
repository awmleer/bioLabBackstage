import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {BioFile} from '../classes/courseware';

@Injectable()
export class CoursewareService {
  constructor(
    private apiSvc: ApiService,
  ) {}

  mkdir(parentId: number, name: string): Promise<number> {
    return this.apiSvc.post(`/courseware/mkdir/`, {
      name,
      parentId
    });
  }

  ls(folderId: number = null): Promise<{path: BioFile[]; files: BioFile[];}> {
    const data:any = {};
    if (folderId !== null) data.folderId = folderId;
    return this.apiSvc.get(`/courseware/ls/`, data);
  }

  deleteFile(fileId: number): Promise<void> {
    return this.apiSvc.get(`/courseware/${fileId}/delete/`);
  }

}
