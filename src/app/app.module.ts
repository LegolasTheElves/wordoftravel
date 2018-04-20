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

//service
import { TravelArticleService } from './travel-articles/travelArticle.service';
import { TravelDestinationService } from './featured-destination/travelDestination.service';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    TravelArticleService,
    TravelDestinationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
