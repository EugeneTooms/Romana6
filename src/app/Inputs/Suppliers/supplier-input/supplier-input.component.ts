import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { SuppliersService } from '../suppliers.service';
import { Supplier } from '../supplier.model';

@Component ({
  selector: 'app-supplier-input',
  templateUrl: './supplier-input.component.html',
  styleUrls: ['./supplier-input.component.css']
})
export class SupplierInputComponent implements OnInit {
  supplier: Supplier;
  isLoading = true;
  isLinear = true;
  private mode = 'create';
  private supplierId: number;
  formGroup: FormGroup;

  get formArray(): AbstractControl | null { return this.formGroup.get('formArray'); }

  constructor(
    private _formBuilder: FormBuilder,
    public suppliersService: SuppliersService,
    public route: ActivatedRoute) {}
  ngOnInit() {
    this.formGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          name: new FormControl(null, {validators : [Validators.required]}),
          oib: new FormControl(null, {validators : [Validators.required,
            Validators.pattern('^[0-9]*$'),
            Validators.minLength(11),
            Validators.maxLength(11)]})
        }),
        this._formBuilder.group({
          contact_person: new FormControl(null),
          city: new FormControl(null),
          zip: new FormControl(null),
          address: new FormControl(null),
          email: new FormControl(null, {validators : [Validators.email]}),
          phone: new FormControl(null),
        }),
        this._formBuilder.group({
          bank_account: new FormControl(null)
        }),
        this._formBuilder.group({
          display: new FormControl(null),
          note: new FormControl(null)
        })
      ])
    });
    this.route.paramMap.subscribe( (paramMap: ParamMap) => {
      if (paramMap.has('supplierId')) {
        this.mode = 'edit';
        this.supplierId = +paramMap.get('supplierId');
        this.supplier = this.suppliersService.getSupplier(this.supplierId);
        this.isLoading = false;
        this.isLinear = false;
        this.formArray.get('0').setValue({
          name: this.supplier.name,
          oib: this.supplier.oib
        });
        this.formArray.get('1').setValue({
          contact_person: this.supplier.contact_person,
          city: this.supplier.city,
          zip: this.supplier.zip,
          address: this.supplier.address,
          email: this.supplier.email,
          phone: this.supplier.phone
        });
        this.formArray.get('2').setValue({
          bank_account: this.supplier.bank_account,
        });
        this.formArray.get('3').setValue({
          display: this.supplier.display,
          note: this.supplier.note
        });
      } else {
        this.mode = 'create';
        this.supplierId = null;
        this.isLoading = false;
      }
    });
  }
  SaveForm() {
    if (this.formArray.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.supplier = {
        // Required
        id: null, // will get back id from the database
        name: this.formArray.get('0').value.name,
        oib: this.formArray.get('0').value.oib,
        // Contact
        contact_person: this.formArray.get('1').value.contact_person,
        city: this.formArray.get('1').value.city,
        zip: this.formArray.get('1').value.zip,
        address: this.formArray.get('1').value.address,
        email: this.formArray.get('1').value.email,
        phone: this.formArray.get('1').value.phone,
        // Bank
        bank_account: this.formArray.get('2').value.bank_account,
        // Optional
        display: this.formArray.get('3').value.display,
        note: this.formArray.get('3').value.note
      };
      this.suppliersService.addSupplier(this.supplier);
    } else if (this.mode === 'edit') {
      const updatedsupplier: Supplier = {
        // Required
        id: this.supplier.id,
        name: this.formArray.get('0').value.name,
        oib: this.formArray.get('0').value.oib,
        // Contact
        contact_person: this.formArray.get('1').value.contact_person,
        city: this.formArray.get('1').value.city,
        zip: this.formArray.get('1').value.zip,
        address: this.formArray.get('1').value.address,
        email: this.formArray.get('1').value.email,
        phone: this.formArray.get('1').value.phone,
        // Bank
        bank_account: this.formArray.get('2').value.bank_account,
        // Optional
        display: this.formArray.get('3').value.display,
        note: this.formArray.get('3').value.note
      };
      this.suppliersService.updateSupplier(updatedsupplier);
    }
  }
}
