import { Component, OnInit, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DestinationService } from '../destination/destination.service';
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';

import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { TravelSearch } from '../travel-search/travelSearch';
import { SearchService } from '../travel-search/search.service';
import { Router } from "@angular/router";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { GeoLocationService } from '../geo-location.service';

declare let $: any;

declare function owlRotator();

@Component({
  selector: 'app-explore-destinations',
  templateUrl: './explore-destinations.component.html',
  styleUrls: ['./explore-destinations.component.css']
})
export class ExploreDestinationsComponent implements OnInit {
  //nearme
  placeid: any;
  places: any;
  searchText: any;
  errorDenied: any;
  // for suggestions
  suggestions = [];
  suggestionsLoading = false;
  suggestionTypeahead = new Subject<string>();
  selectedSuggestion;
  groupByFn: any;
  searchName: any;
  //geolocation
  errorMsg: string;
  currentLocation: Coordinates = null;
  lat: any;
  lon: any;
  nearmePlaces = [];
  //
  tallDestination: any;
  wideDestination: any;
  removeCountries: any;
  errorMessage: string;
  destinations: any;
  countries: any;
  africa: any;
  countriesOfAfrica: any;
  africaFeatured: any;
  exploredestinations: boolean;
  @ViewChildren('owlitem') items: any;

  selectedRegion = {};

  constructor(
    private destinationApiService: DestinationService,
    private featuredDestinationService: DestinationService,
    private searchService: SearchService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private sanitizer: DomSanitizer,
    private geoLocationService: GeoLocationService,
    private ref: ChangeDetectorRef
  ) {
    this.destinations = [];
    this.countriesOfAfrica = [];
    this.africa = [];
    this.africaFeatured = [];

    if (window.location.pathname.includes('explore-destinations')) {
      this.exploredestinations = true;
    } else {
      this.exploredestinations = false;
    }
  }

  ngAfterViewInit() {
    this.items.changes.subscribe(t => {
      owlRotator();
    });
  }

  ngOnInit() {
    this.getDestinations();
    this.getFeaturedDestination();
    //search bar
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

  getDestinations(): void {
    this.destinationApiService.getDestination()
      .subscribe(
        destinations => {
          for (let obj in destinations) {
            if (destinations[obj].RegionName == "Africa") {
              this.africa = destinations[obj];
            } else {
              this.destinations.push(destinations[obj]);
            }
          }

          let countyOfAfrica = this.africa.Countries;
          for (let country of countyOfAfrica) {
            if (country.Show != false) {
              this.countriesOfAfrica.push(country);
            }
          }
        },
        error => {
          this.errorMessage = <any>error;
        });
  }

  selectRegion(item) {
    this.selectedRegion = item;
  }
  //get africa featured
  getFeaturedDestination(): void {
    this.featuredDestinationService.getAfricaFeatured()
      .subscribe(
        africaFeatured => {
          let featuredDestinations = africaFeatured['rsltCol'];
          for (let destination of featuredDestinations) {
            if (destination.Orientation == "L") {
              this.wideDestination = destination;
            } else if (destination.Orientation == "P") {
              this.tallDestination = destination;
            } else {
              this.africaFeatured.push(destination);
            }
          }
        },
        error => this.errorMessage = <any>error,
    );
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
        this.getNearme(this.lat, this.lon);
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