import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url = 'https://staging-k8s-api.mumablue.com/api';

  constructor(private httpClient: HttpClient) { }

  getProducts(productTypeFilters = null) {
    return this.httpClient.get(this.url + '/products');
  }

  getProductById(id) {
    return this.httpClient.get(this.url + '/products/' + id);
  }
}
