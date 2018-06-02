import { Component, OnInit, ViewChildren } from '@angular/core';
import { SingleArticlePageService } from './single-article-page.service';
import { TravelArticles } from '../articlespage/articles';
import { ActivatedRoute } from "@angular/router";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Meta, Title } from '@angular/platform-browser';

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

  articleCategory: string;
  articleName: string;
  places: string;
  placeid: number
  @ViewChildren('relatedPost') items: any;
  constructor(private singleArticleService: SingleArticlePageService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private meta: Meta,
    private title: Title
  ) {
    this.route.params.subscribe(params => {
      this.articleName = params.name;
      let category = params.category.replace(/-/g,' ');
      this.articleCategory = category.toLowerCase();
    });
  }

  ngOnInit() {
    this.getAllArticles();
  }
  //Load isotope
  ngAfterViewInit() {
    loadpopovers();
    this.items.changes.subscribe(t => {
      loadpopovers();
    })
  }
  getAllArticles(): void {
    this.singleArticleService.getArticle(this.articleCategory.concat('/').concat(this.articleName))
      .subscribe(
        article => {
          this.article = <TravelArticles>article['rsltCol'];
          this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.article.ArticleText);
          this.date = this.article.PublishedDate;
          //console.log(JSON.stringify(this.article));
          let articleTitle = this.article.Title ;
          let res = articleTitle.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
          this.title.setTitle(res + " | wordoftravel");
          this.meta.addTag({ name: 'description', content: "" + this.safeHtml + "" });
        },
        error => this.errorMessage = <any>error);
  }
  selectedPlaces(item, id) {
    this.places = item;
    this.placeid = id;
    let location = this.places.replace(/\s/g, '-');
    let res = location.toLowerCase();
    window.location.href = "/wordoftravel/destinations/" + res + "-" + this.placeid;
  }
}
