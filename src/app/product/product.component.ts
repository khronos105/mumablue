import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../entities/product.entity';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  variations = [];

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
      this.dataService.getProducts()
        .subscribe( response => {
          const customProds: Product[] = [];
          for (const item of response['hydra:member']) {
            customProds.push(new Product(item.id, item.namePanel, item.type, item.variations, item.priceOld, item.priceCurrency));
          }
          this.products = customProds;
          for (const product of this.products) {
            const variation = product.getVariation({locale: 'en_US'});
            if (variation) {
              this.variations.push(variation);
            }
          }
          console.log(this.variations);
        });
  }

  productFilterApplied($event) {
    this.router.navigate(['product'], { queryParams: {'product-type': $event}});
  }
}
