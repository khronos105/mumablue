import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-productfilter',
  templateUrl: './productfilter.component.html'
})
export class ProductfilterComponent implements OnInit {
  @Input('langs') langs;
  @Input('filters') filters;
  @Input('countries') countries;
  @Input('people') people;
  @Input('ages') ages;
  @Output() applied = new EventEmitter();
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      book: [],
      doll: []
    });
  }

  onChangeCountry(val) {
    this.filters.country = val;
  }

  submit(formValue) {
    const productTypes = Object.keys(formValue).filter(item => formValue[item]);
    this.applied.emit(this.filters);
  }

  resetFilters() {
    this.filters = {
      lang: 'es',
      country: 'ESP',
      people: null,
      ages: null
    };
    this.applied.emit(this.filters);
  }
}
