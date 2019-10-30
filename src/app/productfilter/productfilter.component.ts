import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {slideFilter} from '../animations/animations';

@Component({
  selector: 'app-productfilter',
  templateUrl: './productfilter.component.html',
  animations: [
    slideFilter
  ]
})
export class ProductfilterComponent implements OnInit {
  /**
   * There are the declarations of the variables that the
   * product.component sends to product.filter
   * These are the members containing data to populate the filter
   * @member langs - array of objects {code, name} that is used to
   * set the language of the filter
   * @member countries - array of strings that stores countries codes
   * @member people - array of numbers [0..n]
   * @member ages - array of strings ['low', 'middle', 'high]
   * @member types - array of strings ['book','doll']
   * @member filters - is an object {types, lang, country, people, ages }
   * it contains the default data to filter, it initializes each filter,
   * and stores each selected filter
   */
  @Input('langs') langs;
  @Input('countries') countries;
  @Input('people') people;
  @Input('ages') ages;
  @Input('types') types;
  @Input('filters') filters;
  @Output() applied = new EventEmitter();
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({});
  }

  /**
   * @param val
   * changes the selected country from select element
   */
  onChangeCountry(val) {
    this.filters.country = val;
  }

  /**
   * @param formValue
   * @method submit - is called when the button "Apply Filters"
   * is pushed (when the form is submited)
   * It emmits an event to product.component with the selected filters
   */
  submit(formValue) {
    this.applied.emit(this.filters);
  }

  /**
   * @param type
   * @method toggleType - it toggles the type of the variation
   * the filters members stores 'types' - array of strings that
   * contains the selected type
   */
  toggleType(type) {
    if (this.filters.types.includes(type)) {
      const typeIndex = this.filters.types.indexOf(type);
      this.filters.types.splice(typeIndex, 1);
    } else {
      this.filters.types.push(type);
    }
  }

  /**
   * @method resetFilters - clears the property filters and
   * refilter all the variations
   */
  resetFilters() {
    localStorage.removeItem('filters');
    this.filters = {
      types: ['book'],
      lang: 'es',
      country: 'ESP',
      people: null,
      ages: null
    };
    this.applied.emit(this.filters);
  }
}
