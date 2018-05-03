import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';

import {debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';
import { TravelSearch } from './travelSearch';
import { SearchService } from './search.service';
import {Router} from "@angular/router";

declare let $: any;

@Component({
  selector: 'app-travel-search',
  templateUrl: './travel-search.component.html',
  styleUrls: ['./travel-search.component.css']
})
export class TravelSearchComponent implements OnInit {

  travel$: Observable<TravelSearch[]>;

	// for suggestions
	suggestions = [];
	suggestionsLoading = false;
	suggestionTypeahead = new Subject<string>();
	selectedSuggestion;

  private searchTerms = new Subject<string>();

  constructor(
		private searchService: SearchService,
		private cd: ChangeDetectorRef,
		private router: Router
	) { }

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
    )

		// typehead for pipe
		this.suggestionTypeahead.pipe(
			tap(() => this.suggestionsLoading = true),
			distinctUntilChanged(),
			debounceTime(200),
			switchMap(term => this.searchService.searchSuggestions(term)),
		).subscribe(res => {
			if (
				res.hasOwnProperty('suggest') &&
				res.suggest.hasOwnProperty('alternateNames-suggestion') &&
				res.suggest['alternateNames-suggestion'].length > 0 &&
				res.suggest['alternateNames-suggestion'][0].hasOwnProperty('options')
			) {
				const value = res.suggest['alternateNames-suggestion'][0].options;
				this.suggestions = value;
			} else {
				this.suggestions = [];
			}
			this.suggestionsLoading = false;
			this.cd.markForCheck();
		}, () => {
			//this.suggestions = [];
			//this.suggestionsLoading = false;
		});
  }

	onClickSearch() {
		const selected = this.selectedSuggestion;
		if (!selected) {
			// TODO error handling
			return
		}
		
		this.router.navigate(['/wordoftravel/destination/',selected.text + "-" + selected._id]);
	}
}
