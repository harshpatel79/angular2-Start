import { Component, OnInit} from '@angular/core';
import {HttpService} from '../Services/http.service';
import {Observable} from 'rxjs/Observable';

/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-about',
  templateUrl: 'about.component.html',
  styleUrls: ['about.component.css']
})
export class AboutComponent implements OnInit { 

	constructor(private httpService: HttpService) {
	    console.log("httpService",this.httpService);
	}

	ngOnInit() {
		this.getStacks();
	}


	getStacks() {
		console.log("before init in getStacks");
		let ca = document.cookie.split(';');
		console.log("ca",ca);
		let getObj = {
	      url:"https://stag-api.contentstack.io/stacks",
	      header: { 
	      	'Content-Type': 'application/json',
	    //  	'Cookie':"authtoken=Pq+HhXOJ97vFT/lvDZYhHZ8tMYPbqGxHafH8RamCrQA=; csid=0c5157e14bd664ea323e9707f738385e220d2a2b8644995fec350334e2be8b8f62d3c036c50739f021b8893c149e825c; _cs_loggedIn=true"
	      }
	    };
	    return this.httpService.get(getObj).subscribe((data) => { 
        	console.log("data",data); 
        },
       error =>  this.errorMessage = <any>error);
	}
	handleError (error: any) {
	    console.log("error",JSON.parse(error._body));
	    let errMsg = (error._body) ? error._body :
	    errMsg = JSON.parse(error._body);
	    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
	    console.error(errMsg);
	    return Observable.throw(errMsg);
	}

}
