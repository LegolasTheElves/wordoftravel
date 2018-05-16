import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ArticlesPageComponent } from './articlespage/articlespage.component';
import { SingleArticlePageComponent } from './single-article-page/single-article-page.component';
import { SearchpageComponent } from './searchpage/searchpage.component';
import { SpecificDestinationComponent } from './specific-destination/specific-destination.component';
import { ExploreDestinationsComponent } from './explore-destinations/explore-destinations.component';
import { OurStoryPageComponent } from './our-story-page/our-story-page.component';


const routes: Routes = [
  { path: '', redirectTo: '/wordoftravel', pathMatch: 'full' },
  { path: 'wordoftravel', component: HomepageComponent },
  { path: 'wordoftravel/travel-articles', component: ArticlesPageComponent },
  { path: 'wordoftravel/travel-articles/:category/:name', component: SingleArticlePageComponent },
  { path: 'wordoftravel/destination/:term', component: SearchpageComponent },
  { path: 'wordoftravel/specific-destination/:RegionName', component: SpecificDestinationComponent },
  { path: 'wordoftravel/explore-destination', component: ExploreDestinationsComponent },
  { path: 'wordoftravel/our-story', component:  OurStoryPageComponent } 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
