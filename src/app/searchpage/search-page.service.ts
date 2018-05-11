import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import { SearchPage } from './searchpage';
import { of } from 'rxjs/observable/of';



@Injectable()
export class SearchPageService {

private _travelUrl = 'https://api.wordoftravel.com/destinations/';

constructor(private http: HttpClient) {
   
 }

getSearch(term: string): Observable<SearchPage[]> {
  console.log("Search URL: " + this._travelUrl + term);
  return this.http.get<SearchPage[]>(this._travelUrl + term)
    //.do(data => console.log('All:' + JSON.stringify(data)))
    .catch(this.handleError);
}
//Error Handler
private handleError(err: HttpErrorResponse) {
  console.log(err.message);
  return Observable.throw(err.message);
}

  searchSuggestions(term: string): Observable<any> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
		const url = `https://places-api.wordoftravel.com/v1/cities/suggestions/${term}`;
		return this.http.get(url);
  }
}
