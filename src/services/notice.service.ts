import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {NoticeBrief, NoticeDetail} from '../classes/notice';
import {Page} from '../classes/page';

@Injectable()
export class NoticeService {
  constructor(
    private apiSvc: ApiService
  ) {}


  noticeList(pageNumber:number):Promise<Page<NoticeBrief>>{
    return this.apiSvc.get(`/notice/list/${pageNumber}/`);
  }

  addNotice(data):Promise<number>{
    return this.apiSvc.post('/notice/add/', data);
  }

  editNotice(noticeId:number, data):Promise<void>{
    return this.apiSvc.post(`/notice/${noticeId}/edit/`, data);
  }

  noticeDetail(id:number):Promise<NoticeDetail>{
    return this.apiSvc.get(`/notice/${id}/detail/`);
  }

  star(id: number): Promise<void> {
    return this.apiSvc.get(`/notice/${id}/star`);
  }

  unstar(id: number): Promise<void> {
    return this.apiSvc.get(`/notice/${id}/unstar`);
  }
}
