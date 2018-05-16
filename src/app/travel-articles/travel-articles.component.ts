import { Component, OnInit } from '@angular/core';
import { TravelArticleService } from '../travel-articles/travelArticle.service'
import { TravelArticle } from './travelArticle';

@Component({
  selector: 'app-travel-articles',
  templateUrl: './travel-articles.component.html',
  styleUrls: ['./travel-articles.component.css']
})
export class TravelArticlesComponent implements OnInit {
  errorMessage: string;
  travels: TravelArticle[];

  constructor(private travelApiService: TravelArticleService) { }

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
