import { Component, OnInit, ViewChildren, ChangeDetectorRef, ViewChild } from '@angular/core';
import { SearchPageService } from './search-page.service';
import { SearchPage } from './searchpage';

import { ActivatedRoute, Router } from "@angular/router";
import { SearchService } from '../travel-search/search.service';
import { tap, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { Meta, Title } from '@angular/platform-browser';
import { NgSelectComponent } from '@ng-select/ng-select';
import { GeoLocationService } from '../geo-location.service';

declare function loadisotope();
declare function hideSplash();
declare function loadpopovers();
declare let $: any;

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.css']
})
export class SearchpageComponent implements OnInit {

  showPosition(arg0: any): any {
    throw new Error("Method not implemented.");
  }

  @ViewChild('searchinput') public ngSelect: NgSelectComponent;

  errorMessage: string;
  searchResult: SearchPage[];
  searchTerm: any;
  searchName: any;
  groupByFn: any;
  searchText: any;
  widerSearch: string;

  // for suggestions
  suggestions = [];
  suggestionsLoading = false;
  suggestionTypeahead = new Subject<string>();
  selectedSuggestion;
  selectedItem = {};
  //geolocation
  errorMsg: string;
  currentLocation: Coordinates = null;
  lat: any;
  lon: any;
  nearmePlaces = [];

  @ViewChildren('isotopeitems') items: any;

  constructor(
    private searchApiService: SearchPageService,
    private route: ActivatedRoute,
    private searchService: SearchService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private meta: Meta,
    private title: Title,
    private geoLocationService: GeoLocationService,
    private ref: ChangeDetectorRef,
  ) {
    //Title and Meta Description
    this.route.params.subscribe(params => {
      this.searchTerm = params.term;
      this.searchName = (this.searchTerm.split(/[0-9\-_]+/).join(' '));
      //Meta Tags
      let placeName = this.searchName;
      let res = placeName.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
      this.title.setTitle("Travel Blogs about " + res + " | wordoftravel");
      this.meta.addTag({
        name: 'description', content: "Planning a trip to " + res +
          "? Forget the guidebook! Get real travel advice and read real travel experiences about " + res +
          "from all of your favourite travel bloggers. Read blogs about what matters to you - where to stay, what to see and where to eat in " + res + ""
      });
    });
  }
  ngOnInit() {
    this.searchByCurrent();
    this.getSearchResult();
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
            value: item.text,
            group: "Places"
          }
        });
        this.suggestions = value;
        //GroupBy
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
  //Load isotope
  ngAfterViewInit() {
    loadpopovers();
    this.items.changes.subscribe(t => {
      loadisotope();
    })
  }
  //Get result from API
  getSearchResult(): void {
    this.searchApiService.getSearch(this.searchTerm)
      .subscribe(
        searchResult => {
          if (searchResult['rsltCol']) {
            this.searchResult = searchResult['rsltCol'];
          } else {
            this.widerSearch = "We couldn't find many blog posts in that exact place so we've expanded the search to nearby locations";
            this.searchResult = searchResult['widersltCol'];
          }
          for (let i = 0; i < this.searchResult.length; i++) {
            for (let j = 0; j < this.searchResult[i].Places.length; j++) {
              this.searchResult[i].Places[j].LocationSlug = this.searchResult[i].Places[j].LocationName.split(" ").join("-").toLowerCase();
            }
          }
          console.log(this.searchResult);
        },
        error => {
          this.errorMessage = <any>error;
          hideSplash();
        });
  }

  //Search in search page
  onClickSearch() {
    console.log("Clicked Search");
    const selected = this.selectedSuggestion;
    if (!selected) {
      // TODO error handling
      return
    }
    this.getSearchResult();
    let location = selected.value.replace(/\s/g, '-');
    var res = location.toLowerCase();
    window.location.href = "/wordoftravel/destinations/" + res + "-" + selected.id;
  }
  //Modal popup
  selectItem(item) {
    this.selectedItem = item;
  }

  search() {
    window.location.href = "/wordoftravel/destinations/" + this.searchText;
  }

  handleKeyup(event) {
    this.searchText = event.target.value.toString();
  }

  handleFocus(event) {
    this.ngSelect.placeholder = "";
  }

  searchByCurrent() {
    let self = this;
    const accuracy = { enableHighAccuracy: true };
    self.geoLocationService.getLocation(accuracy).subscribe(
      position => {
        self.currentLocation = position;
        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;
        //get nearme places
        this.getNearme(this.lat, this.lon);
        self.ref.detectChanges();
      },
      error => {
        self.errorMsg = error;
        self.ref.detectChanges();
      }
    );
  }
  //nearme method
  getNearme(latitude, longitude) {
    let lat = latitude;
    let lon = longitude;
    this.searchService.searchNearme(lat, lon)
      .subscribe(
        nearme => {
          this.nearmePlaces.push(nearme['hits']['hits'][0]._source);
          //console.log(this.nearmePlaces);
        },
        error => this.errorMessage = <any>error);
  }

}
