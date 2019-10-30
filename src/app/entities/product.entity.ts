import {Variation} from './variation.entity';
import {filter} from 'rxjs/operators';


export class Product {
  public id;
  public type;
  public countries;
  public availableAges;
  public variations;
  public priceOld;
  private priceCurrency;
  private rating;

  constructor(props) {
    this.id = props.id;
    this.type = props.type;
    this.countries = props.countries;
    this.availableAges = props.availableAges;
    this.variations = props.variations;
    this.priceOld = props.priceOld;
    this.priceCurrency = props.priceCurrency;
    this.rating = props.rating;
    this.configCountries();
    this.initVariations();
  }

  initVariations() {
    const variations = this.variations.map(v => {
      const metaDescription = this.replaceDescription(v);
      const price = this.splitPrices(this.priceCurrency);
      const oldPrice = this.priceOld ? this.splitPrices(this.priceOld) : null;
      // Setting default variation image in case that the variation doesn't contain image
      let img = '/assets/coming-soon.png';
      if (v.variationImage != null && v.variationImage.url != null) {
        img = v.variationImage.url;
      }

      const variation = {
        id: v.id,
        productID: this.id,
        name: v.name,
        desc: metaDescription,
        type: this.type,
        language: {code: v.language.code, title: v.language.name},
        countries: this.countries,
        people: v.people,
        ages: this.availableAges,
        rating: this.rating,
        synopsis: v.synopsis,
        img,
        price,
        oldPrice
      };

      return new Variation(variation);
    });
    this.variations = variations;
  }

  splitPrices(prop) {
    return prop.split(' ')[0] + this.priceCurrency.split(' ')[1];
  }

  replaceDescription(desc) {
    if (typeof desc === 'string' && desc.length > 1) {
      return desc;
    }
    return desc.synopsis.substr(0, 120) + '...';
  }

  getVariation(filters) {
    // Filter by Product Type
    const variations = this.variations.filter(variation => {
      return filters.types.includes(variation.type);
    })
    // Filter by Language
      .filter(variation => {
        return variation.language.code === filters.lang;
      })
      // Filter by Country
      .filter(variation => {
        return variation.countries.includes(filters.country);
      })
      // Filter by People
      .filter(variation => {
        if (filters.people) {
          return variation.people === filters.people;
        } else {
          return variation;
        }
      }).filter(variation => {
        if (filters.ages) {
          return variation.ages.includes(filters.ages);
        } else {
          return variation;
        }
      });

    return variations[0];
  }

  getLangs() {
    let langs = [];
    for (const v of this.variations) {
      langs.push(v.language);
    }

    /**
     * Removing duplicate languages like English US and English GB
     * that have "en" lang code, remaining only English GB
     */
    langs = this.removeDuplicates(langs, 'code');
    return langs;
  }

  private removeDuplicates(array, key) {
    const lookup = new Set();
    return array.filter(obj => !lookup.has(obj[key]) && lookup.add(obj[key]));
  }

  /**
   * Preparing and returning Product Countries
   */
  configCountries() {
    for (let i = 0; i < this.countries.length; i++) {
      this.countries[i] = this.countries[i].split('/')[3];
    }
  }
}
