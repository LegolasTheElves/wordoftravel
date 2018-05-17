import { Injectable } from '@angular/core';
import { HomeSearch } from './homeSearch';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';


@Injectable()
export class HomeSearchService {
  _ismobile = (function () {
    let _travelUrl = 'https://api.wordoftravel.com/featuredlocations/HomeSearch';
    let _travelUrlMobile = 'https://api.wordoftravel.com/featuredlocations/HomeSearch?platform=mobile';
    if (navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
      || navigator.userAgent.match(/SamsungBrowser/i)
      || navigator.userAgent.match(/SAMSUNG|Samsung|SGH-[I|N|T]|GT-[I|N]|SM-[N|P|T|Z]|SHV-E|SCH-[I|J|R|S]|SPH-L/i)
    ) {
      return _travelUrlMobile;
    }
    else {
      return _travelUrl;
    }
  })();

  constructor(private http: HttpClient) { }

  getHomesearches(): Observable<HomeSearch[]> {
    return this.http.get<HomeSearch[]>(this._ismobile)
      //.do(data => console.log('All:' + JSON.stringify(data)))
      .catch(this.handleError);
  }
  //Error Handler
  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
  }
}
