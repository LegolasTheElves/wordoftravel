import { Component, OnInit, ViewChildren } from '@angular/core';
import { SearchPageService } from './search-page.service';
import { SearchPage } from './searchpage';

import {ActivatedRoute} from "@angular/router";

declare function loadisotope();

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

  @ViewChildren('isotopeitems') items: any;

  constructor(private searchApiService: SearchPageService, private route: ActivatedRoute) { 
    this.route.params.subscribe( params => {
      this.searchTerm = params.term;
      this.searchName = this.searchTerm.split(/[0-9.\-_]+/);
      
    });
  }
  ngOnInit() {
    this.getSearchResult();
  }

  ngAfterViewInit() {
    this.items.changes.subscribe(t => {
      loadisotope();
    })
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
