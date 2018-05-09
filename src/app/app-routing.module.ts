import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ArticlesPageComponent } from './articlespage/articlespage.component';
import { SearchpageComponent } from './searchpage/searchpage.component';

const routes: Routes = [
  { path: '', redirectTo: '/wordoftravel', pathMatch: 'full' },
  { path: 'wordoftravel', component: HomepageComponent },
  { path: 'wordoftravel/travel-articles', component: ArticlesPageComponent },
  { path: 'wordoftravel/destination/:term', component: SearchpageComponent}

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule {
  

}
