import { Component, OnInit, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { SearchPageService } from './search-page.service';
import { SearchPage } from './searchpage';

import { ActivatedRoute, Router } from "@angular/router";
import { SearchService } from '../travel-search/search.service';
import { tap, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

declare function loadisotope();
declare let $: any;

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.css']
})
export class SearchpageComponent implements OnInit {
  errorMessage: string;
  searchResult: SearchPage[];
  searchTerm: any;
  searchName: any;
  groupByFn: any;
  searchText: any;

  // for suggestions
  suggestions = [];
  suggestionsLoading = false;
  suggestionTypeahead = new Subject<string>();
  selectedSuggestion;

  selectedItem = {};

  @ViewChildren('isotopeitems') items: any;

  constructor(
    private searchApiService: SearchPageService,
    private route: ActivatedRoute,
    private searchService: SearchService,
    private cd: ChangeDetectorRef,
    private router: Router,
  ) {
    this.route.params.subscribe(params => {
      this.searchTerm = params.term;
      this.searchName = this.searchTerm.split(/[0-9\-_]+/).join('');
    });
  }
  ngOnInit() {
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
            label: item.text + ', ' + item._source.countryCode,
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
    this.items.changes.subscribe(t => {
      loadisotope();
    })
  }
  //Get result from API
  getSearchResult(): void {
    this.searchApiService.getSearch(this.searchTerm)
      .subscribe(
        searchResult => {
          this.searchResult = searchResult['rsltCol'];
        },
        error => this.errorMessage = <any>error);
  }
  //Search in search page
  onClickSearch() {
    const selected = this.selectedSuggestion;
    if (!selected) {
      // TODO error handling
      return
    }
    this.getSearchResult();
    window.location.href = "/wordoftravel/destination/" + selected.value + "-" + selected.id;
  }
  //Modal popup
  selectItem(item) {
    this.selectedItem = item;
  }
  search() {
    window.location.href = "/wordoftravel/destination/" + this.searchText;
  }
  handleKeyup(event) {
    this.searchText = event.target.value.toString();
  }


}
