import { Component, OnInit, ViewChildren, ViewChild } from '@angular/core';
import { SearchPageService } from './search-page.service';
import { SearchPage } from './searchpage';

import { ActivatedRoute, Router } from "@angular/router";
import { SearchService } from '../travel-search/search.service';
import { Meta, Title } from '@angular/platform-browser';
import { NgSelectComponent } from '@ng-select/ng-select';

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
  @ViewChild('searchinput') public ngSelect: NgSelectComponent;

  errorMessage: string;
  searchResult: SearchPage[];
  searchTerm: any;
  searchName: any;
  groupByFn: any;
  searchText: any;
  widerSearch: string;

  selectedItem = {};
 

  @ViewChildren('isotopeitems') items: any;

  constructor(
    private searchApiService: SearchPageService,
    private route: ActivatedRoute,
    private searchService: SearchService,
    private router: Router,
    private meta: Meta,
    private title: Title,
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
    this.getSearchResult();
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
        },
        error => {
          this.errorMessage = <any>error;
          hideSplash();
        });
  }
  //Modal popup
  selectItem(item) {
    this.selectedItem = item;
  }
  handleFocus(event) {
    this.ngSelect.placeholder = "";
  }
}
