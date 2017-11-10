import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StartPageComponent } from './start-page/start-page.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { SearchResultListComponent } from './search-result-list/search-result-list.component';

const appRoutes: Routes = [
  { path: '', component: StartPageComponent },
  { path: 'detail', component: DetailPageComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    DetailPageComponent,
    PageNotFoundComponent,
    SearchFormComponent,
    SearchResultListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
