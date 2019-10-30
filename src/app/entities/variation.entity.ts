export class Variation {
  id;
  productID;
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
  synopsis;

  constructor(v) {
    this.id = v.id;
    this.productID = v.productID;
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
    this.synopsis = v.synopsis;
  }

  public countMember(count: number): Array<number> {
    const indexes = [];
    for (let i = 0; i < count; i++) {
      indexes.push(i);
    }
    return indexes;
  }
}
