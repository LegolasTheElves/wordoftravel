import { Component, OnInit, ViewChildren } from '@angular/core';
import { SingleArticlePageService } from './single-article-page.service';
import { TravelArticles } from '../articlespage/articles';
import { ActivatedRoute } from "@angular/router";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

declare function loadpopovers();

@Component({
  selector: 'app-single-article-page',
  templateUrl: './single-article-page.component.html',
  styleUrls: ['./single-article-page.component.css']
})
export class SingleArticlePageComponent implements OnInit {

  errorMessage: string;
  article: TravelArticles;
  safeHtml: SafeHtml;

  constructor(private singleArticleService: SingleArticlePageService, private route: ActivatedRoute,private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getAllArticles();
  }

  getAllArticles(): void {
    this.singleArticleService.getArticle('green/a2')
      .subscribe(
        article => {
          this.article = <TravelArticles>article['rsltCol'];
          console.log(this.article);
          this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.article.ArticleText);
        },
        error => this.errorMessage = <any>error);
  }
}
