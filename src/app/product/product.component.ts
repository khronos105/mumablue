import {Component, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {Variation} from '../entities/variation.entity';
import {Product} from '../entities/product.entity';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products$: Product[] = [];
  variations = [];

  langs: string[];
  countries: string[];
  people: number[];
  ages: string[];
  // Declaring default filter
  filters = {
    lang: 'es',
    country: 'ESP',
    people: null,
    ages: null
  };

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
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
          this.products$.push(new Product(item.id, item.type, item.countries, item.availableAges, item.variations, item.priceOld, item.priceCurrency, item.rating));
        }
        this.setVariations();
        this.getProductsLangs();
        this.getProductsCountries();
        this.getVariationPeople();
        this.getProductsAges();
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

  productFilterApplied($event) {
    this.filters = $event;
    this.variations = [];
    this.setVariations();
  }
}
