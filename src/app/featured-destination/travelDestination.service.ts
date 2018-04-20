import { Injectable } from '@angular/core';
import { TravelDestination } from '../featured-destination/travelDestination';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';

@Injectable()

export class TravelDestinationService {
  private _travelUrl = 'https://api.wordoftravel.com/featuredlocations/HomeFeatured?limit=8';

  constructor(private http: HttpClient) { }

  getTravelDestination(): Observable<TravelDestination[]> {
    return this.http.get<TravelDestination[]>(this._travelUrl)
      //.do(data => console.log('All:' + JSON.stringify(data)))
      .catch(this.handleError);
  }
  //Error Handler
  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
  }
}