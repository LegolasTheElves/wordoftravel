import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { SearchPageService } from './search-page.service';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.css']
})
export class SearchpageComponent implements OnInit {
  results: Object;
  searchTerm$ = new Subject<string>();

  constructor(private searchService: SearchPageService) {
    this.searchService.search(this.searchTerm$)
      .subscribe(results => {
        this.results = results.results;
      });
  }
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

}
