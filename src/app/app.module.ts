import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { AppRouteModule } from './approute.module';
import { CategoryComponent } from './components/category.component';
import { CategoryItemsComponent } from './components/category-items.component';
import { StarwarsService } from './starwars.service';
import { CategoryItemDetailsComponent } from './components/category-item-details.component';


@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    CategoryItemsComponent,
    CategoryItemDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    AppRouteModule
  ],
  providers: [ StarwarsService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
