import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import { Destination } from './destination';
import { TravelDestination } from '../featured-destination/travelDestination';

@Injectable()
export class DestinationService {
  private _destinationUrl = './assets/api/regions.json';
  private _travelUrl = 'https://api.wordoftravel.com/featuredlocations/HomeFeatured?region=';
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
  getFeaturedDestination(region: string): Observable<TravelDestination[]> {
    return this.http.get<TravelDestination[]>(this._travelUrl + region)
      //.do(data => console.log('All:' + JSON.stringify(data)))
      .catch(this.handleError);
  }
  getAfricaFeatured(): Observable<TravelDestination[]> {
    return this.http.get<TravelDestination[]>(this._travelUrl + "africa")
      .do(data => console.log('All:' + JSON.stringify(data)))
      .catch(this.handleError);
  }

}
