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
  article: any;
  safeHtml: SafeHtml;
  date: any;

  constructor(private singleArticleService: SingleArticlePageService, private route: ActivatedRoute,private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getAllArticles();
  }
  
  //Load isotope
  ngAfterViewInit() {
      loadpopovers();
  }


  getAllArticles(): void {
    this.singleArticleService.getArticle('green/test-zyx')
      .subscribe(
        article => {
          this.article = <TravelArticles>article['rsltCol'];
          this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.article.ArticleName);
          this.date = this.article.PublishedDate;
        },
        error => this.errorMessage = <any>error);
  }
}
