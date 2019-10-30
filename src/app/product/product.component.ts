import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';
import {map} from 'rxjs/operators';
import {Product} from '../entities/product.entity';

/** Importing custom animations */
import {fade} from '../animations/animations';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  animations: [
    fade
  ]
})
export class ProductComponent implements OnInit, OnDestroy {

  /**
   * @member products$ - stores a collection of Product resources
   */
  products$: Product[] = [];
  /**
   * @member variations - stores a collection of Variation resources
   */
  variations = [];

  /**
   * @member langs - array of strings ['en', 'es'...]
   * @member countries - array of strings ['ESP',...]
   * @member people - array of numbers [0, 1]
   * @member ages - array of strings ['low', 'middle', 'high']
   * @member types - array of strings ['book', 'doll']
   * these members stores all data to fill/build the filters(HTML elements)
   */
  langs: string[];
  countries: string[];
  people: number[];
  ages: string[];
  types = [];

  /**
   * @member filters - stores the default filter data
   */
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
    if (localStorage.getItem('filters')) {
      this.filters = JSON.parse(localStorage.getItem('filters'));
    }
  }

  ngOnInit() {
    /** On initializing the component it calls the service and retrieves data from server */
    this.dataService.getProducts()
      .pipe(
        map(response => {
          return response['hydra:member'];
        })
      )
      .subscribe(response => {
        for (const item of response) {
          /** This is the {} that holds the initial data to create a Product object */
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
        /** Retrieving the data from Products to fill the default filter */
        this.setVariations();
        this.getProductsLangs();
        this.getProductsCountries();
        this.getVariationPeople();
        this.getProductsAges();
        this.getProductsTypes();
      });
  }

  /** Getting all filtered Variations of each Product */
  private setVariations() {
    for (const product of this.products$) {
      const variation = product.getVariation(this.filters);
      /**
       * In case that the method getVariation retrieves Variation
       * object it stores to variations member
       */
      if (variation) {
        this.variations.push(variation);
      }
    }
  }

  /**
   * @method getProductsLangs
   * Getting all available languages
   * In this function it verifies which product
   * has the most available languages
   */
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

  /**
   * @method getProductsCountries
   * Getting all available countries
   * In this function it verifies which product
   * has the most available countries
   */
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


  /**
   * @method getVariationPeople
   * Getting the people of each Product
   * In this function it verifies which product
   * has the most available people
   */
  getVariationPeople() {
    let people = 0;
    for (let i = 0; i < this.variations.length; i++) {
      if (people < this.variations[i].people) {
        people = this.variations[i].people;
      }
    }
    this.people = new Array(people);
  }

  /**
   * @method getProductsAges
   * Getting the Available Ages of each Product
   * In this function it verifies which product
   * has the most available Ages
   */
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

  /**
   * @method getProductsTypes
   * Getting the Types of each Product
   * In this function it verifies which product
   * has the most available Types
   */
  getProductsTypes() {
    for (let i = 0; i < this.products$.length; i++) {
      if (!this.types.includes(this.products$[i].type)) {
        this.types.push(this.products$[i].type);
      }
    }
  }

  /**
   * @method productFilterApplied
   * @param $event
   * This method is called when the form of filters is submited
   * The form sends to this method a object of filters
   * First step to clear current variations
   * Second to show the filtered Varations
   */
  productFilterApplied($event) {
    this.filters = $event;
    this.variations = [];
    this.setVariations();
  }

  /**
   * @method ngOnDestroy
   * @param $event
   * This method stores the filter in local storage
   * when we go to another page
   */
  ngOnDestroy(): void {
    localStorage.setItem('filters', JSON.stringify(this.filters));
  }
}
