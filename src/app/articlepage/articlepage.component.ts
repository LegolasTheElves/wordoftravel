import { Component, OnInit } from '@angular/core';
import { ArticlepageService } from './articlespage.service';
import { TravelArticles } from './articles';

@Component({
  selector: 'app-articlepage',
  templateUrl: './articlepage.component.html',
  styleUrls: ['./articlepage.component.css']
})
export class ArticlepageComponent implements OnInit {

  errorMessage: string;
  articles: TravelArticles[];

  constructor(private articlesService: ArticlepageService) { }
  ngOnInit() {
    this.getAllArticles();
  }

  getAllArticles(): void {
    this.articlesService.getArticles()
      .subscribe(
        articles => {
          this.articles = articles['rsltCol'];
        },
        error => this.errorMessage = <any>error);
  }

}
