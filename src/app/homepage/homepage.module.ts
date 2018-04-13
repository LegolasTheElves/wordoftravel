import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AboutAreaComponent } from '../about-area/about-area.component';
import { FeaturedDestinationComponent } from '../featured-destination/featured-destination.component';
import { TravelArticlesComponent } from '../travel-articles/travel-articles.component';
import { DestinationComponent } from '../destination/destination.component';
import { BloggerComponent } from '../blogger/blogger.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AboutAreaComponent,
    FeaturedDestinationComponent,
    TravelArticlesComponent,
    DestinationComponent,
    BloggerComponent
  ]
})
export class HomepageModule { }
