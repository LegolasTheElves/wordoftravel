import { Component, OnInit } from '@angular/core';
import { ArticlesPageService } from './articlespage.service';
import { TravelArticles } from './articles';

@Component({
  selector: 'app-articlepage',
  templateUrl: './articlespage.component.html',
  styleUrls: ['./articlespage.component.css']
})
export class ArticlesPageComponent implements OnInit {

  errorMessage: string;
  articles: TravelArticles[];

  constructor(private articlesService: ArticlesPageService) { }
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
