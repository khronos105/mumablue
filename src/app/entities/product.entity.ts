import {Variation} from './variation.entity';

/**
 * @class Product
 * It holds all the Product logic
 * It is initialized with a {}
 * It initializes and Manages the Variations objects
 * Also the filter logic is here becouse it stores all the Variations objects
 */
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

  /**
   * @method initVariations
   * Builds and stores the variations
   */
  initVariations() {
    /** Foreach variation it manipulates the stored data */
    const variations = this.variations.map(v => {
      /** This var stores the Variation description depending if
       * the Product description is set or is not empty space */
      const metaDescription = this.replaceDescription(v);
      /** Setting the price of the Variation */
      const price = this.splitPrices(this.priceCurrency);
      /** Setting the oldPrice if the Product contains it */
      const oldPrice = this.priceOld ? this.splitPrices(this.priceOld) : null;
      /** Setting default variation image in case that the variation doesn't contain image */
      let img = '/assets/coming-soon.png';
      if (v.variationImage != null && v.variationImage.url != null) {
        img = v.variationImage.url;
      }
      /** This var contains the data to initialize the Variation objects */
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

  /**
   * @method replaceDescription
   * @param desc
   * Returns the description for the variation
   * The parameter desc is the Product description element
   * If it is empty or not set it returns a string of 120 characters
   * of the synopsis
   */
  replaceDescription(desc) {
    if (typeof desc === 'string' && desc.length > 1) {
      return desc;
    }
    return desc.synopsis.substr(0, 120) + '...';
  }

  /**
   * @getVariation
   * @param filters
   * This method stores the logic of filtering variations
   * The parameter filters is an object {types, lang, country, people, ages}
   */
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
      })
      // Filter Available Ages
      .filter(variation => {
        if (filters.ages) {
          return variation.ages.includes(filters.ages);
        } else {
          return variation;
        }
      });

    return variations[0];
  }

  /**
   * @method getLangs
   * returns an array of strings ['en', 'es'...]
   */
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

  /**
   * @method removeDuplicates
   * @param array
   * @param key
   * This method is used as helper to remove duplicates of an array
   */
  private removeDuplicates(array, key) {
    const lookup = new Set();
    return array.filter(obj => !lookup.has(obj[key]) && lookup.add(obj[key]));
  }

  /**
   * @method configCountries
   * Preparing and returning Product Countries
   */
  configCountries() {
    for (let i = 0; i < this.countries.length; i++) {
      this.countries[i] = this.countries[i].split('/')[3];
    }
  }
}
