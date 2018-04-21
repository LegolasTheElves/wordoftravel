import { Injectable } from '@angular/core';
import { HomeSearch } from './homeSearch';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';


@Injectable()
export class HomeSearchService {

  private _travelUrl = 'https://api.wordoftravel.com/featuredlocations/HomeSearch';

  constructor(private http: HttpClient) { }

  getHomesearches(): Observable<HomeSearch[]> {
    return this.http.get<HomeSearch[]>(this._travelUrl)
      .do(data => console.log('All:' + JSON.stringify(data)))
      .catch(this.handleError);
  }
  //Error Handler
  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
  }

}
