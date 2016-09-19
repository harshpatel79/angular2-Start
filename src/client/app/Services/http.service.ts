import { Injectable } from '@angular/core';
import {Http, Response,Headers,RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';



@Injectable()
export class HttpService{
  constructor(private http: Http) {}

  get(data){
  	let headers = new Headers(data.header);
    let options = new RequestOptions({ headers: headers });
  	return this.http.get(data.url,options)
                         .map((res:Response) => res.json())
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  post(data){
  	let headers = new Headers(data.header);
    let options = new RequestOptions({ headers: headers });
  	return this.http.post(data.url, data.body, options)
                         .map((res:Response) => res.json())
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
 
  }


}
