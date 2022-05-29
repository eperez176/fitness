import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SubComponent } from './pages/sub/sub.component';
import { HeaderComponent } from './components/header/header.component';
import { DataComponent } from './pages/data/data.component';
import { WorkoutItemComponent } from './components/workout-item/workout-item.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'sub', component: SubComponent},
  {path:'data',component:DataComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SubComponent,
    HeaderComponent,
    DataComponent,
    WorkoutItemComponent
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
