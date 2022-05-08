import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SubComponent } from './pages/sub/sub.component';
import { HeaderComponent } from './components/header/header.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'sub', component: SubComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SubComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes,{enableTracing: false}),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
