import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { TravelSearch } from './travelSearch';

@Injectable()
export class SearchService {
  private travelUrl = 'https://api.wordoftravel.com/featuredlocations/HomeFeatured';
  constructor(private http: HttpClient) { }

  searchTravel(term: string): Observable<TravelSearch[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    let results = this.http.get(`${this.travelUrl}?LocationName=${term}`);
    
    console.log(JSON.stringify(results));

    return results['rsltCol'];
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
