import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {Page} from '../classes/page';
import {PostBrief, PostDetail, PostGroup} from '../classes/bbs';

@Injectable()
export class BbsService {

  constructor(
    private apiSvc: ApiService,
  ) { }

  postList(pageNumber:number, orderBy:string='id'):Promise<Page<PostBrief>>{
    console.log(pageNumber);
    return this.apiSvc.get(`/bbs/post/list/${pageNumber}/`,{
      orderBy: orderBy
    });
  }

  postDetail(postId):Promise<PostDetail>{
    return this.apiSvc.get(`/bbs/post/${postId}/`);
  }

  deletePost(postId: number): Promise<void> {
    return this.apiSvc.post(`/bbs/post/delete/`, {
      postId
    });
  }

  postGroups(): Promise<PostGroup[]> {
    return this.apiSvc.get('/bbs/group/all/');
  }

  removeGroup(groupId: number) {
    return this.apiSvc.get(`/bbs/group/${groupId}/remove/`);
  }

  addGroup(name: string) {
    return this.apiSvc.post('/bbs/group/add/', {
      name
    });
  }


}
