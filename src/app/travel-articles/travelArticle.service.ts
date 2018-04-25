import { Injectable } from '@angular/core';
import { TravelArticle } from '../travel-articles/travelArticle';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';

@Injectable()

export class TravelArticleService {
  private _travelUrl = 'https://api.wordoftravel.com/articles?limit=4';

  constructor(private http: HttpClient) { }

  getTravelArticle(): Observable<TravelArticle[]> {
    return this.http.get<TravelArticle[]>(this._travelUrl)
      .do(data => console.log('All:' + JSON.stringify(data)))
      .catch(this.handleError);
  }
  //Error Handler
  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
  }
}
