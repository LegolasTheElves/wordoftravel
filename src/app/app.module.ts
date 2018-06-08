//module
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
//component
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutAreaComponent } from './about-area/about-area.component';
import { FeaturedDestinationComponent } from './featured-destination/featured-destination.component';
import { TravelArticlesComponent } from './travel-articles/travel-articles.component';
import { TravelArticlesHomepageComponent } from './travel-articles-homepage/travel-articles-homepage.component';
import { DestinationComponent } from './destination/destination.component';
import { BloggerComponent } from './blogger/blogger.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ArticlesPageComponent } from './articlespage/articlespage.component';
import { SigninComponent } from './signin/signin.component';
import { TravelSearchComponent } from './travel-search/travel-search.component';
import { SingleArticlePageComponent } from './single-article-page/single-article-page.component';
import { SpecificDestinationComponent } from './specific-destination/specific-destination.component';
import { ExploreDestinationsComponent } from './explore-destinations/explore-destinations.component';
import { OurStoryPageComponent } from './our-story-page/our-story-page.component';

//service
import { TravelArticleService } from './travel-articles/travelArticle.service';
import { TravelArticleHomepageService } from './travel-articles-homepage/travelArticle.service';
import { TravelDestinationService } from './featured-destination/travelDestination.service';
import { HomeSearchService } from './about-area/home-search.service';
import { SearchService } from './travel-search/search.service';
import { SearchpageComponent } from './searchpage/searchpage.component';
import { SearchDetailsComponent } from './searchpage/sub/details/details-component';
import { SearchPageService } from './searchpage/search-page.service';
import { PopoverComponent } from './popover/popover.component';
import { ArticlesPageService } from './articlespage/articlespage.service';
import { SingleArticlePageService } from './single-article-page/single-article-page.service';
import { DestinationService } from './destination/destination.service';
import { GeoLocationService } from './geo-location.service';
import { CookieService } from 'ngx-cookie-service';
import { CommonSearchBarComponent } from './common-search-bar/common-search-bar.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutAreaComponent,
    HomepageComponent,
    FeaturedDestinationComponent,
    TravelArticlesComponent,
    TravelArticlesHomepageComponent,
    DestinationComponent,
    BloggerComponent,
    ArticlesPageComponent,
    SigninComponent,
    TravelSearchComponent,
    SearchpageComponent,
    PopoverComponent,
    SearchDetailsComponent,
    SingleArticlePageComponent,
    SpecificDestinationComponent,
    ExploreDestinationsComponent,
    OurStoryPageComponent,
    CommonSearchBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
		NgSelectModule,
		AngularFontAwesomeModule,
  ],
  providers: [
    TravelArticleService,
    TravelArticleHomepageService,
    TravelDestinationService,
    HomeSearchService,
    SearchService,
    SearchPageService,
    ArticlesPageService,
    SingleArticlePageService,
    DestinationService,
    GeoLocationService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
