import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import { TravelArticles } from './articles';

@Injectable()

export class ArticlepageService {
  private _travelUrl = 'https://api.wordoftravel.com/articles?limit=10';

  constructor(private http: HttpClient) { }

  getArticles(): Observable<TravelArticles[]> {
    return this.http.get<TravelArticles[]>(this._travelUrl)
      //.do(data => console.log('All:' + JSON.stringify(data)))
      .catch(this.handleError);
  }
  //Error Handler
  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
  }
}