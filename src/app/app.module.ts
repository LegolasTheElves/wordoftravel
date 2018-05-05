//module
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
//component
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutAreaComponent } from './about-area/about-area.component';
import { FeaturedDestinationComponent } from './featured-destination/featured-destination.component';
import { TravelArticlesComponent } from './travel-articles/travel-articles.component';
import { DestinationComponent } from './destination/destination.component';
import { BloggerComponent } from './blogger/blogger.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ArticlepageComponent } from './articlepage/articlepage.component';
import { SigninComponent } from './signin/signin.component';
import { TravelSearchComponent } from './travel-search/travel-search.component';

//service
import { TravelArticleService } from './travel-articles/travelArticle.service';
import { TravelDestinationService } from './featured-destination/travelDestination.service';
import { HomeSearchService } from './about-area/home-search.service';
import { SearchService } from './travel-search/search.service';
import { SearchpageComponent } from './searchpage/searchpage.component';
import { SearchPageService } from './searchpage/search-page.service';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';

import { NgSelectModule } from '@ng-select/ng-select';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutAreaComponent,
    HomepageComponent,
    FeaturedDestinationComponent,
    TravelArticlesComponent,
    DestinationComponent,
    BloggerComponent,
    ArticlepageComponent,
    SigninComponent,
    TravelSearchComponent,
    SearchpageComponent,
    SideNavbarComponent,
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
    TravelDestinationService,
    HomeSearchService,
    SearchService,
    SearchPageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
