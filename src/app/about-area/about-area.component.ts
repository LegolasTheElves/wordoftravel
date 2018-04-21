import { Component, OnInit } from '@angular/core';
import { HomeSearchService } from './home-search.service';
import { HomeSearch } from './homeSearch';

@Component({
  selector: 'app-about-area',
  templateUrl: './about-area.component.html',
  styleUrls: ['./about-area.component.css']
})
export class AboutAreaComponent implements OnInit {
  errorMessage: string;
  homeSearches: HomeSearch[];
  activeItem: HomeSearch;


  constructor(private homeSearchService: HomeSearchService) { }

  ngOnInit() {
    this.getHomeSearches();
  }
  getHomeSearches(): void{
    this.homeSearchService.getHomesearches()
    .subscribe(
      homeSearches => {
        let result = homeSearches.rsltCol;
        this.activeItem = result.shift();
        this.homeSearches = result;
      },
      error => this.errorMessage = <any>error);
  }

}
