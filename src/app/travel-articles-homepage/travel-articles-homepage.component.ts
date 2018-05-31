import { Component, OnInit } from '@angular/core';
import { TravelArticleHomepageService } from '../travel-articles-homepage/travelArticle.service'
import { TravelArticleHomepage } from './travelArticle';

@Component({
  selector: 'app-travel-articles-homepage',
  templateUrl: './travel-articles-homepage.component.html',
  styleUrls: ['./travel-articles-homepage.component.css']
})
export class TravelArticlesHomepageComponent implements OnInit {
  errorMessage: string;
  travels: TravelArticleHomepage[];

  constructor(private travelApiService: TravelArticleHomepageService) { }

  ngOnInit() {
    this.getTravels();
  }

  getTravels(): void {
    this.travelApiService.getTravelArticle()
      .subscribe(
        travels => {
          if(travels['rsltCol']){
            this.travels = travels['rsltCol'];
          } else {
            this.travels = travels['widersltCol'];
          }
        },error => this.errorMessage = <any>error);
  }
  
}
