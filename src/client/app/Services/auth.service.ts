import { Injectable } from '@angular/core';
import {Http, Response,Headers,RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {HttpService} from './http.service';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { Subject } from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class AuthService {
   _isLoggedIn: boolean = false;
   user: object = {};
  private _isLoggedInEvent: BehaviorSubject<boolean>;
  private _isLoggedInObservable: Observable<boolean>;
  //isLoggedIn: boolean = false;
  //private _panelOpened = new BehaviorSubject<boolean>(false);

  // store the URL so we can redirect after logging in
  //loggedUser$: Observable<User[]>;
  //loggedUserObserver: Observer<User[]>;
  //loggedUserInfo:User[];
  redirectUrl: string;
  constructor(private http: Http,private httpService: HttpService) {
    console.log("httpService",httpService);
    this._isLoggedInEvent = new BehaviorSubject<boolean>(false);
    this._isLoggedInObservable =  this._isLoggedInEvent.asObservable();
    // this.loggedUser$ = new Observable<User[]>(
    //   observer => {
    //   this.loggedUserObserver = observer;
    // }
    // ).share();
  }
  // isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  // isUserLogged(){
  //   return this.isLoggedIn.asObservable();
  // }
  login(data) {
    console.log("data",data);
    let postBody = {'user': data};
    console.log("postBody",postBody);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    //return Observable.of(true).delay(0).do(val =>this._isLoggedIn = true);
    let postObj = {
      url:"https://stag-api.contentstack.io/user-session",
      body: postBody,
      header: { 'Content-Type': 'application/json'}
    };
    return this.httpService.post(postObj)
    //return this.http.post("https://stag-api.contentstack.io/user-session", postBody, options)
                    //.toPromise()
                    //.then(this.extractData)
    //                .map(res => res.json())
                    .map((res) => {
                      console.log("res in map",res);
                      if (res.notice === "Login Successful!") {
                        console.log("res in if",res);
                        this._isLoggedIn = true;
                      }
                      this.user = res || {}; 
                      return this.user;
                    })
                    .catch(this.handleError);
                    
  }
  //extractData(res: Response) {
  //  let body = res.json();
  //  if(body.notice === "Login Successful!"){
      // console.log("bodyrespone ",body);
      // console.log("this._isLoggedIn",this._isLoggedIn);
  //    this._isLoggedIn = true;
      // //this.isLoggedInEvent.next(true);
      // //this.isLoggedIn = true;
      // //this.isLoggedIn.next(true);
      // console.log("this._isLoggedIn",this._isLoggedIn);
  //    return body || { };
  //  }
  //}

  handleError (error: any) {
    console.log("error",JSON.parse(error._body));
    let errMsg = (error._body) ? error._body :
    errMsg = JSON.parse(error._body);
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  logout() {
    this._isLoggedIn = false;
  }
  isLoggedIn() {
    return this._isLoggedIn;
  }
  isLoggedInObservable() : Observable<boolean> {
     return this._isLoggedInObservable;
  }
}


// export class AuthService {
//   islogin = false;
//   isLoggedIn() {
//     return this.islogin;
//   };
//   login(data){
//     console.log("data",data);
//     this.islogin = true;
//   };
// }
