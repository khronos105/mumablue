export class Variation {
  name;
  img;
  desc;
  type;
  people;
  language;
  price;
  oldPrice;
  countries;
  ages;
  rating;

  constructor(v) {
    this.name = v.name;
    this.img = v.img;
    this.desc = v.desc;
    this.type = v.type;
    this.language = v.language;
    this.countries = v.countries;
    this.people = v.people;
    this.ages = v.ages;
    this.price = v.price;
    this.oldPrice = v.oldPrice;
    this.rating = v.rating;
  }
}
