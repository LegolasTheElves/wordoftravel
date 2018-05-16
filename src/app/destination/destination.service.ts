import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import { Destination } from './destination';

@Injectable()
export class DestinationService {
  private _destinationUrl = './assets/api/regions.json';

  constructor(private http: HttpClient) { }

  getDestination(): Observable<any> {
    return this.http.get(this._destinationUrl)
      //.do(data => console.log('All:' + JSON.stringify(data)))
      .catch(this.handleError);
  }
  //Error Handler
  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
  }

}
