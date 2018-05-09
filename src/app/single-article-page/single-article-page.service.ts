import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import { TravelArticles } from '../articlespage/articles';

@Injectable()

export class SingleArticlePageService {
  private _travelUrl = 'https://api.wordoftravel.com/articles/';

  constructor(private http: HttpClient) { }

  getArticle(url: string): Observable<TravelArticles> {
    return this.http.get<TravelArticles>(this._travelUrl+url)
      //.do(data => console.log('All:' + JSON.stringify(data)))
      .catch(this.handleError);
  }
  //Error Handler
  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
  }
}