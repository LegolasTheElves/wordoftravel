import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';

import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import { TravelSearch } from './travelSearch';
import { SearchService } from './search.service';
@Component({
  selector: 'app-travel-search',
  templateUrl: './travel-search.component.html',
  styleUrls: ['./travel-search.component.css']
})
export class TravelSearchComponent implements OnInit {

  travel$: Observable<TravelSearch[]>;
  private searchTerms = new Subject<string>();

  constructor(private searchService: SearchService) { }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.travel$ = this.searchTerms
    .pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.searchService.searchTravel(term)),
    );
  }

}
