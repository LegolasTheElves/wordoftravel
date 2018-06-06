import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';

import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { TravelSearch } from './travelSearch';
import { SearchService } from './search.service';
import { Router } from "@angular/router";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { GeoLocationService } from '../geo-location.service';

declare let $: any;

@Component({
	selector: 'app-travel-search',
	templateUrl: './travel-search.component.html',
	styleUrls: ['./travel-search.component.css']
})
export class TravelSearchComponent implements OnInit {
	//nearme
	placeid: any;
	places: any;
	searchText: any;
	errorDenied:any;
	// for suggestions
	suggestions = [];
	suggestionsLoading = false;
	suggestionTypeahead = new Subject<string>();
	selectedSuggestion;
	groupByFn: any;
	searchName: any;

	safeHtml: SafeHtml;

	 //geolocation
	 errorMsg: string;
	 errorMessage: string;
	 currentLocation: Coordinates = null;
	 lat: any;
	 lon: any;
	 nearmePlaces = [];

	constructor(
		private searchService: SearchService,
		private cd: ChangeDetectorRef,
		private router: Router,
		private sanitizer: DomSanitizer,
		private geoLocationService: GeoLocationService,
		private ref: ChangeDetectorRef,
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
						label: item.displayText,
						id: item._id,
						value: item._source.asciiName,
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
		let location = selected.value.replace(/[,\s]+|[,\s]+/g, '-');
		var res = location.toLowerCase();
		window.location.href = "/wordoftravel/destinations/" + res + "-" + selected.id;
	}
	search() {
		window.location.href = "/wordoftravel/destinations/" + this.searchText;
	}

	handleKeyup(event) {
		this.searchText = event.target.value.toString();
	}

	searchByCurrent() {
		let self = this;
		const accuracy = { enableHighAccuracy: true };
		self.geoLocationService.getLocation(accuracy).subscribe(
		  position => {
			self.currentLocation = position;
			this.lat = position.coords.latitude;
			this.lon = position.coords.longitude;
			//console.log(this.lat + '-' + this.lon);
			this.getNearme(this.lat,this.lon);
			self.ref.detectChanges();
		  },
		  error => {
			self.errorMsg = error;
			this.errorDenied = "We are unable to show locations near you as you have disabled location sharing. Please re-enable and reload the page to use this feature.";
			console.log(this.errorDenied);
			self.ref.detectChanges();
		  }
		);
	  }
	//Get nearme places
	  getNearme(latitude, longitude) {
		let lat = latitude;
		let lon = longitude;
		this.searchService.searchNearme(lat, lon)
		  .subscribe(
			nearme => {
			  this.nearmePlaces = nearme['hits']['hits'];
			  //console.log(this.nearmePlaces);
			},
			error => this.errorMessage = <any>error);
	  }
	  //redirect to searchpage
	  selectedPlaces(item, id) {
		this.places = item;
		this.placeid = id;
		let location = this.places.replace(/\s/g, '-');
		let res = location.toLowerCase();
		window.location.href = "/wordoftravel/destinations/" + res + "-" + this.placeid;
	  }
}
