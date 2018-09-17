import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { environment} from '../../../environments/environment';
import { Supplier } from './supplier.model';

const BACKEND_URL = environment.apiURL + 'suppliers/';
@Injectable({providedIn : 'root'})
export class SuppliersService {
  private suppliers: Supplier[] = [];
  private suppliersUpdated = new Subject<Supplier[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getSuppliers() {
    this.http.get<{message: string, data: Supplier[]}>(BACKEND_URL)
      .subscribe( (suppliersData) => {
        this.suppliers = suppliersData.data;
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
        this.router.navigate(['/inputs/suppliers']);
      });
  }
  deleteSupplier(supplier_id: number) {
    this.http.delete<{message: string, data: any}>(BACKEND_URL + supplier_id)
      .subscribe( (responseData) => {
        console.log(responseData);
        const updateSuppliers = this.suppliers.filter( supplier => supplier.id !== supplier_id);
        this.suppliers = updateSuppliers;
        this.suppliersUpdated.next([...this.suppliers]);
      });
  }

}
