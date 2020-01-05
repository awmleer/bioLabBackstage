import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {UserInfo, UserItem} from '../classes/user';
import {Page} from '../classes/page';

@Injectable()
export class AccountService {

  user: UserInfo = null;

  constructor(
    private apiSvc: ApiService,
  ) {}

  login(username:string, password:string):Promise<void>{
    return this.apiSvc.post('/user/login/',{
      username: username,
      password: password
    }).then((userInfo:UserInfo) => {
      this.user=userInfo;
    });
  }

  logout():Promise<void>{
    return this.apiSvc.get('/user/logout/').then(() => {
      this.user=null;
    });
  }

  getUserInfo(userId:number=null){
    let p = this.apiSvc.get(`/user/${userId==null?'':userId+'/'}info/`);
    if(userId==null){
      p =p.then((userInfo: UserInfo) => {
        this.user=userInfo;
        return userInfo;
      });
    }
    return p;
  }

  getUserList(pageNumber: number = 0, params: {
    accountType?: 'student' | 'teacher';
    search?: string;
    sort?: string;
  } = {}): Promise<Page<UserInfo>> {
    return this.apiSvc.get(`/user/list/${pageNumber}/`, params);
  }

  addUser(user: UserInfo) {
    return this.apiSvc.post(`/user/add/`, user);
  }

  changeUserInfo(userId: number, user: UserInfo) {
    return this.apiSvc.post(`/user/${userId}/change-info/`, user);
  }

  delete(userId: number) {
    return this.apiSvc.get(`/user/${userId}/delete/`);
  }

}
