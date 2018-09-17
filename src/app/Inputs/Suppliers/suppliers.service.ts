import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment} from '../../../environments/environment';
import { Supplier } from './supplier.model';



const BACKEND_URL = environment.apiURL + 'suppliers/';
@Injectable({providedIn : 'root'})
export class SuppliersService {
  private suppliers: Supplier[] = [];
  private suppliersUpdated = new Subject<Supplier[]>();

  constructor(private http: HttpClient) {}

  getSuppliers() {
    this.http.get<{message: string, data: Supplier[]}>(BACKEND_URL)
      .subscribe( (suppliersData) => {
        this.suppliers = suppliersData.data;
        this.suppliersUpdated.next([...this.suppliers]);
      });
  }
  getSuppliersListener() {
    return this.suppliersUpdated.asObservable();
  }


}
