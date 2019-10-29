import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import {RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProductfilterComponent } from './productfilter/productfilter.component';
import {DataService} from './services/data.service';

const routes: Routes = [
  {
    path: 'product',
    component: ProductComponent
  },
  {
    path: '',
    component: ProductComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductfilterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
