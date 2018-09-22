import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Location } from '@angular/common';

import { environment} from '../../../environments/environment';
import { Supplier } from './supplier.model';


const BACKEND_URL = environment.apiURL + 'suppliers/';
@Injectable({providedIn : 'root'})
export class SuppliersService {
  private suppliers: Supplier[] = [];
  private suppliersUpdated = new Subject<Supplier[]>();

  constructor(private http: HttpClient, private router: Router, private location: Location) {}


  getSuppliers() {
    this.http.get<{message: string, data: any}>(BACKEND_URL)
      .pipe(map((suppliersData) => {
      return suppliersData.data.map( supplier => {
        return {
          id: supplier.id,
          name: supplier.name,
          oib: supplier.oib,
          address: supplier.address,
          city: supplier.city,
          phone: supplier.phone,
          display: supplier.display,
          zip: supplier.zip,
          contact_person: supplier.contact_person,
          bank_account: supplier.bank_account,
          email: supplier.email,
          note: supplier.note,
        };
      });
      }))
      .subscribe(transSuppliers => {
        this.suppliers = transSuppliers;
        this.suppliersUpdated.next([...this.suppliers]);
      });
  }
  getSupplier(id: number) {
    return {...this.suppliers.find(supplier => supplier.id === id)};
  }
  getSuppliersListener() {
    return this.suppliersUpdated.asObservable();
  }
  addSupplier(supplier: Supplier) {
    this.http.post<{message: string, data: number}>(BACKEND_URL, supplier)
      .subscribe( (responseData) => {
        supplier.id = responseData.data;
        this.suppliers.push(supplier);
        this.suppliersUpdated.next([...this.suppliers]);
        this.location.back();
      });
  }
  updateSupplier(supplier: Supplier) {
    this.http.put<{message: string, data: number}>(BACKEND_URL + supplier.id, supplier)
      .subscribe( (responseData) => {
        this.location.back();
      });
  }
  deleteSupplier(supplier_id: number) {
    this.http.delete<{message: string, data: any}>(BACKEND_URL + supplier_id)
      .subscribe( (responseData) => {
        const updateSuppliers = this.suppliers.filter( supplier => supplier.id !== supplier_id);
        this.suppliers = updateSuppliers;
        this.suppliersUpdated.next([...this.suppliers]);
      });
  }

}
