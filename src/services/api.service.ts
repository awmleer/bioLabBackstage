import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {CONST} from '../const';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient,
    private messageSvc: NzMessageService,
  ) {}

  private handleHttp(request:Observable<Object>,messageOnError:boolean){
    return request.toPromise().catch((error:HttpErrorResponse) => {
      if (messageOnError) {
        let messageText;
        if (error.status === 403) {
          messageText='您没有权限进行该操作';
        }else{
          messageText='出错了';
        }
        this.messageSvc.create('error', messageText);
      }
      throw new Error('出错了');
    }).then((data)=>{
      if (data['status']==='success') {
        return data['payload'];
      }else{
        if (messageOnError) {
          this.messageSvc.create('error', data['payload']);
        }
        throw new Error(data['payload']);
      }
    });
  }

  get(
    url:string,
    params:{
      [param: string]: any;
    }=null,
    messageOnError:boolean=true
  ):Promise<any>{
    const request=this.http.get(CONST.apiUrl+url,{
      params:params,
      withCredentials:true
    });
    return this.handleHttp(request,messageOnError);
  }

  post(url:string, body:object=null, messageOnError:boolean=true):Promise<any>{
    const request=this.http.post(CONST.apiUrl+url, body,{
      withCredentials:true
    });
    return this.handleHttp(request,messageOnError);
  }

}
