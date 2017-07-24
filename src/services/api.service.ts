import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {CONFIG} from "../app/config";

@Injectable()
export class ApiService {

  constructor(
    private http: Http
  ) {}

  get(url:string, params:object={}):Promise<any>{
    return this.http.get(CONFIG.apiUrl+url,{
      params:params
    }).toPromise().then((response:Response)=>{
      let data = response.json();
      if (data['status']=='success') {
        return data['payload'];
      }else{
        throw new Error(data['payload']);
      }
    });
  }

  post(url:string, body:object={}):Promise<any>{
    return this.http.post(CONFIG.apiUrl+url, body).toPromise().then((response:Response)=>{
      let data = response.json();
      if (data['status']=='success') {
        return data['payload'];
      }else{
        throw new Error(data['payload']);
      }
    });
  }


}
