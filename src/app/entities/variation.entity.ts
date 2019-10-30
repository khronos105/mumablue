/**
 * @class Variation
 * This class is used to build Variation objects
 * It stores all the necesary data to filter and to show in templates
 * It also contains data from Product Class
 * I decided to not inherit from Product Class for a better performance
 * One Product that contains all the Variation instances
 */
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

  /**
   * @method countMember
   * @param count
   * This method is used to create an array of numbers
   * for that members that are not iterables, but must be
   * iterated in the templates
   * So passing to this method a member: number it returns an
   * array of this number of elements
   * It is used for the rating and people to print several icons of users or stars
   */
  public countMember(count: number): Array<number> {
    const indexes = [];
    for (let i = 0; i < count; i++) {
      indexes.push(i);
    }
    return indexes;
  }
}
