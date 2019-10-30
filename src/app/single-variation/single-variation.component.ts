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
/**
 * Component to show the Variation details
 * @class
 */
export class SingleVariationComponent implements OnInit {
  /** @member Product - stores the Product from the server */
  product$;
  /** @member Variation - stores the variation that will be shown in the single template*/
  variation;

  /**
   * @param dataService - service to connect with server
   * @param router
   * @param route
   */
  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  /**
   * In this state is getting the parameters from URL
   * and in base of that it filters the Product and
   * Variation to show.
   * It builds a Product object and sets a Variation
   * instance
   */
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
          });
      });
  }

}
