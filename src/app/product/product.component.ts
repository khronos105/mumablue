import {Component, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';
import {map} from 'rxjs/operators';
import {Product} from '../entities/product.entity';
import {slideProducts, fade} from '../animations/animations';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  animations: [
    slideProducts,
    fade
  ]
})
export class ProductComponent implements OnInit {

  products$: Product[] = [];
  variations = [];

  langs: string[];
  countries: string[];
  people: number[];
  ages: string[];
  types = [];
  // Declaring default filter
  filters = {
    lang: 'es',
    types: ['book'],
    country: 'ESP',
    people: null,
    ages: null
  };

  constructor(
    private dataService: DataService
  ) {
  }

  ngOnInit() {
    this.dataService.getProducts()
      .pipe(
        map(response => {
          return response['hydra:member'];
        })
      )
      .subscribe(response => {
        for (const item of response) {
          const props = {
            id: item.id,
            type: item.type,
            countries: item.countries,
            availableAges: item.availableAges,
            variations: item.variations,
            priceOld: item.priceOld,
            priceCurrency: item.priceCurrency,
            rating: item.rating
          };
          this.products$.push(new Product(props));
        }
        this.setVariations();
        this.getProductsLangs();
        this.getProductsCountries();
        this.getVariationPeople();
        this.getProductsAges();
        this.getProductsTypes();
      });
  }

  private setVariations() {
    for (const product of this.products$) {
      const variation = product.getVariation(this.filters);
      if (variation) {
        this.variations.push(variation);
      }
    }
  }

  getProductsLangs() {
    const lang = {length: 0, prodIndex: 0};
    for (let i = 0; i < this.products$.length; i++) {
      if (lang.length < this.products$[i].variations.length) {
        lang.length = this.products$[i].variations.length;
        lang.prodIndex = i;
      }
    }
    this.langs = this.products$[lang.prodIndex].getLangs();
  }

  getProductsCountries() {
    const country = {length: 0, prodIndex: 0};
    for (let i = 0; i < this.products$.length; i++) {
      if (country.length < this.products$[i].countries.length) {
        country.length = this.products$[i].countries.length;
        country.prodIndex = i;
      }
    }
    this.countries = this.products$[country.prodIndex].countries;
  }

  getVariationPeople() {
    let people = 0;
    for (let i = 0; i < this.variations.length; i++) {
      if (people < this.variations[i].people) {
        people = this.variations[i].people;
      }
    }
    this.people = new Array(people);
  }

  getProductsAges() {
    const ages = {length: 0, prodIndex: 0};
    for (let i = 0; i < this.products$.length; i++) {
      if (ages.length < this.products$[i].countries.length) {
        ages.length = this.products$[i].countries.length;
        ages.prodIndex = i;
      }
    }
    this.ages = this.products$[ages.prodIndex].availableAges;
  }

  getProductsTypes() {
    for (let i = 0; i < this.products$.length; i++) {
      if (!this.types.includes(this.products$[i].type)) {
        this.types.push(this.products$[i].type);
      }
    }
  }

  productFilterApplied($event) {
    this.filters = $event;
    this.variations = [];
    this.setVariations();
  }
}
