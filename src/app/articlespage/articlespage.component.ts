import { Component, OnInit, ViewChildren } from '@angular/core';
import { ArticlesPageService } from './articlespage.service';
import { TravelArticles } from './articles';

declare function loadpopovers();

@Component({
  selector: 'app-articlepage',
  templateUrl: './articlespage.component.html',
  styleUrls: ['./articlespage.component.css']
})
export class ArticlesPageComponent implements OnInit {

  errorMessage: string;
  articles: TravelArticles[];

  @ViewChildren('travelarticles') items: any;

  constructor(private articlesService: ArticlesPageService) { }
  ngOnInit() {
    this.getAllArticles();
  }

  getAllArticles(): void {
    this.articlesService.getArticles()
      .subscribe(
        articles => {
          this.articles = articles['rsltCol'];
          console.log(this.articles);
        },
        error => this.errorMessage = <any>error);
  }

  //Load isotope
  ngAfterViewInit() {
    this.items.changes.subscribe(t => {
      loadpopovers();
    })
  }

  openSingleArticle(item: TravelArticles){
    console.log(JSON.stringify(item));
  }
}
