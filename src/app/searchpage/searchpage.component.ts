import { Component, OnInit, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { SearchPageService } from './search-page.service';
import { SearchPage } from './searchpage';

import { ActivatedRoute, Router } from "@angular/router";
import { SearchService } from '../travel-search/search.service';
import { tap, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

declare function loadisotope();
declare function clickIsotope();

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
  // for suggestions
  suggestions = [];
  suggestionsLoading = false;
  suggestionTypeahead = new Subject<string>();
  selectedSuggestion;

  selectedItem = {};
  popOverHtml = "<div class='text-option text-uppercase mb-10'><a href='#'><div class='bg-svg-icon'><object id='svg1' data='./assets/svg/icon-share.svg' type='image/svg+xml' class='icon-options'></object></div>Share</a></div><div class='text-option text-uppercase mb-10'><a href='#'><div class='bg-svg-icon'><object id='svg1' data='./assets/svg/icon-favorite.svg' type='image/svg+xml' style='width: 9px;'class='icon-options2'></object></div>Favourite</a></div><div class='text-option text-uppercase mb-10'><a href='#'><div class='bg-svg-icon'><object id='svg1' data='./assets/svg/morefrombloggers.svg' type='image/svg+xml' class='icon-options'></object></div>More from Bloggers</a></div><div class='text-option text-uppercase'><a href='#'> <div class='bg-svg-icon'><object id='svg1' data='./assets/svg/report.svg' type='image/svg+xml' class='icon-options'></object></div>Report Issue</a></div>";

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

  //Load isotope
  ngAfterViewInit() {
    this.items.changes.subscribe(t => {
      loadisotope();
    })
  }
  ngAfterClick() {
    this.items.changes.subscribe(t => {
      clickIsotope();
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
    window.location.href= "/wordoftravel/destination/" + selected.text + "-" + selected._id;

  }

  //Modal popup
  selectItem(item) {
    this.selectedItem = item;
    console.log(item);
  }
}
