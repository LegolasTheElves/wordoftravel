import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';

import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { TravelSearch } from './travelSearch';
import { SearchService } from './search.service';
import { Router } from "@angular/router";

declare let $: any;

@Component({
	selector: 'app-travel-search',
	templateUrl: './travel-search.component.html',
	styleUrls: ['./travel-search.component.css']
})
export class TravelSearchComponent implements OnInit {
	searchText: any;
	// for suggestions
	suggestions = [];
	suggestionsLoading = false;
	suggestionTypeahead = new Subject<string>();
	selectedSuggestion;
	groupByFn: any;
	searchName:any;

	constructor(
		private searchService: SearchService,
		private cd: ChangeDetectorRef,
		private router: Router
	) { }
	ngOnInit(): void {
		// typehead for pipe
		this.suggestionTypeahead.pipe(
			tap(() => this.suggestionsLoading = true),
			distinctUntilChanged(),
			debounceTime(200),
			switchMap(term => this.searchService.searchSuggestions(term)),
		).subscribe(res => {
			if (
				res.hasOwnProperty('suggest') &&
				res.suggest.hasOwnProperty('asciiName-suggestion') &&
				res.suggest['asciiName-suggestion'].length > 0 &&
				res.suggest['asciiName-suggestion'][0].hasOwnProperty('options')
			) {
				const value = $.map(res.suggest['asciiName-suggestion'][0].options, function (item) {
					return {
						label: item.text + ', ' + item._source.countryName,
						id: item._id,
						value: item.text,
						group: "Places"
					}
				});
				this.suggestions = value;
				this.groupByFn = (item) => item.group;
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
		//Go to specific destination base on the param
		let location = decodeURIComponent(selected.value);
		window.location.href = "/wordoftravel/destination/" + location.replace(/\s/g,'') + "-" + selected.id;
	}
	search() {
		window.location.href = "/wordoftravel/destination/" + this.searchText;
	  }
	
	  handleKeyup(event) {
		this.searchText = event.target.value.toString();
	  }
}
