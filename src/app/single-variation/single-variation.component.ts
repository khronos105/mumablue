import {Component, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../entities/product.entity';
import {fade, singleSidebar, slideFilter, slideProducts} from '../animations/animations';

@Component({
  selector: 'app-single-variation',
  templateUrl: './single-variation.component.html',
  styleUrls: ['./single-variation.component.css'],
  animations: [fade]
})
export class SingleVariationComponent implements OnInit {

  product$;
  variation;

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap
      .subscribe(params => {
        const productID = +params.get('productID');
        const variationID = +params.get('variationID');
        this.product$ = this.dataService.getProductById(productID)
          .subscribe((res: any) => {
            const props = {
              id: res.id,
              type: res.type,
              countries: res.countries,
              availableAges: res.availableAges,
              variations: res.variations,
              priceOld: res.priceOld,
              priceCurrency: res.priceCurrency,
              rating: res.rating
            };
            this.product$ = new Product(props);
            const variation = this.product$.variations
              .filter(item => {
                return item.id === variationID;
              });
            this.variation = variation[0];
            console.log(this.product$);
            console.log(this.variation);
          });
      });
  }

}
