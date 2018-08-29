import {Injectable} from '@angular/core';
import {CONST} from '../app/const';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';
import {Observable} from 'rxjs';
import {ApiError} from '../classes/error';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient,
    private messageSvc: NzMessageService,
    private router: Router,
  ) {}

  private handleHttp(request:Observable<Object>){
    return request.toPromise().catch((error:HttpErrorResponse) => {
      let messageText;
      if (error.status === 403) {
        messageText='您没有权限进行该操作';
      } else if (error.status === 401) {
        messageText='请先登录';
        this.router.navigate(['/login']);
      } else {
        messageText='出错了';
      }
      throw new ApiError(messageText);
    }).then((data)=>{
      if (data['status']==='success') {
        return data['payload'];
      }else{
        throw new ApiError(data['payload']);
      }
    });
  }

  get(
    url:string,
    params:{
      [param: string]: any;
    }=null
  ):Promise<any>{
    const request=this.http.get(CONST.apiUrl+url,{
      params:params,
      withCredentials:true
    });
    return this.handleHttp(request);
  }

  post(url:string, body:any=null):Promise<any>{
    const request=this.http.post(CONST.apiUrl+url, body,{
      withCredentials:true
    });
    return this.handleHttp(request);
  }

}
