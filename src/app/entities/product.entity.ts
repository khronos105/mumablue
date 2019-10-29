
export class Product {
   constructor(public id, public namePanel, public type, public variations, public priceOld, private priceCurrency) {
   }

  getPrice() {
    return this.priceCurrency.split(' ')[0];
  }

  getCurrency() {
    return this.priceCurrency.split(' ')[1];
  }

  getVariation(args) {
     const variations = this.variations.filter( variation => {
        if (variation) {
          return variation.language.locale === args.locale;
        }
     });
     return variations[0];
  }
}
