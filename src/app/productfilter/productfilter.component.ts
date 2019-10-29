import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-productfilter',
  templateUrl: './productfilter.component.html'
})
export class ProductfilterComponent implements OnInit {

  @Output() applied = new EventEmitter();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      book: [],
      doll: []
    });
  }

  submit(formValue) {
    const productTypes = Object.keys(formValue).filter(item => formValue[item]);

    this.applied.emit(productTypes);
  }

}
