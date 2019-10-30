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
  @Input('langs') langs;
  @Input('filters') filters;
  @Input('countries') countries;
  @Input('people') people;
  @Input('ages') ages;
  @Input('types') types;
  @Output() applied = new EventEmitter();
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({});
  }

  onChangeCountry(val) {
    this.filters.country = val;
  }

  submit(formValue) {
    this.applied.emit(this.filters);
  }

  toggleType(type) {
    if (this.filters.types.includes(type)) {
      const typeIndex = this.filters.types.indexOf(type);
      this.filters.types.splice(typeIndex, 1);
    } else {
      this.filters.types.push(type);
    }
  }

  resetFilters() {
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
