import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { TravelSearch } from './travelSearch';

@Injectable()
export class SearchService {
  constructor(private http: HttpClient) { }

  searchTravel(term: string): Observable<TravelSearch[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }

  	const travelUrl = 'https://api.wordoftravel.com/featuredlocations/HomeFeatured';
    let results = this.http.get(`${travelUrl}?LocationName=${term}`);


    return results['rsltCol'];
  }

  searchSuggestions(term: string): Observable<any> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
		const url = `https://places-api.wordoftravel.com/v1/cities/suggestions/${term}`;
		return this.http.get(url);
  }
  //Nearme suggestion
  searchNearme(lat, lon): Observable<any> {
		const url = `https://places-api.wordoftravel.com/v1/cities/nearme/${lat}/${lon}`;
    //return this.http.get(url);
    return this.http.get(url)
      .do(data => console.log('All NearMe:' + JSON.stringify(data)))
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
