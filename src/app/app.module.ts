import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {ProductComponent} from './product/product.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProductfilterComponent} from './productfilter/productfilter.component';
import {DataService} from './services/data.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SingleVariationComponent } from './single-variation/single-variation.component';

const routes: Routes = [
  {
    path: 'variation/:productID/:variationID',
    component: SingleVariationComponent
  },
  {
    path: '',
    component: ProductComponent
  },
  {
    path: '**',
    component: ProductComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductfilterComponent,
    SingleVariationComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
