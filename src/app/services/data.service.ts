import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
/**
 * Service that retrieves the Products from server
 * @class
 */
export class DataService {
  /** @member url - the url of the server */
  private url = 'https://staging-k8s-api.mumablue.com/api';

  constructor(private httpClient: HttpClient) { }

  /**
   * method that returns a collection of Products
   */
  getProducts() {
    return this.httpClient.get(this.url + '/products');
  }

  /**
   * Getting the Product resource from server in base of the
   * parameter id
   * @param id
   */
  getProductById(id) {
    return this.httpClient.get(this.url + '/products/' + id);
  }
}
