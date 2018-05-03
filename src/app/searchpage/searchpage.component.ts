import { Component, OnInit } from '@angular/core';
import { SearchPageService } from './search-page.service';
import { SearchPage } from './searchpage';

import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.css']
})
export class SearchpageComponent implements OnInit {
  errorMessage: string;
  searchResult: SearchPage[];
  searchTerm: any;

  constructor(private searchApiService: SearchPageService, private route: ActivatedRoute) { 
    this.route.params.subscribe( params => {
      this.searchTerm = params.term;
    });
  }

  ngOnInit() {
    this.getSearchResult();
  }

  getSearchResult(): void {
    this.searchApiService.getSearch(this.searchTerm)
      .subscribe(
        searchResult => {
          this.searchResult = searchResult['rsltCol'];
        },
        error => this.errorMessage = <any>error);
  }

}
