import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutAreaComponent } from './about-area/about-area.component';
import { FeaturedDestinationComponent } from './featured-destination/featured-destination.component';
import { TravelArticlesComponent } from './travel-articles/travel-articles.component';
import { DestinationComponent } from './destination/destination.component';
import { BloggerComponent } from './blogger/blogger.component';
import { HomepageComponent } from './homepage/homepage.component';

import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutAreaComponent,
    FeaturedDestinationComponent,
    TravelArticlesComponent,
    DestinationComponent,
    BloggerComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'worldoftravel', component: HomepageComponent},
      {path: '', redirectTo: 'worldoftravel', pathMatch: 'full'}
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
