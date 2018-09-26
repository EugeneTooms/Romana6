import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment} from '../../../environments/environment';
import { Product } from './product.model';


const BACKEND_URL = environment.apiURL + 'products/';
@Injectable({providedIn : 'root'})
export class ProductsService {
  private products: Product[] = [];
  private productssUpdated = new Subject<Product[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getProducts() {
    this.http.get<{message: string, data: any}>(BACKEND_URL)
      .pipe(map((productsData) => {
        return productsData.data.map( product => {
          return {
            id: product.id
          };
        });
      }))
      .subscribe(transProducts => {
        this.products = transProducts;
        this.productssUpdated.next([...this.products]);
      });
  }
  getProduct(id: number) {
    return {...this.products.find(product => product.id === id)};
  }
  getProductsListener() {
    return this.productssUpdated.asObservable();
  }
  addProduct(product: Product) {
    this.http.post<{message: string, data: number}>(BACKEND_URL, product)
      .subscribe( (responseData) => {
        product.id = responseData.data;
        this.products.push(product);
        this.productssUpdated.next([...this.products]);
        this.router.navigate(['/inputs/products']);
      });
  }
  updateProduct(product: Product) {
    this.http.put<{message: string, data: number}>(BACKEND_URL + product.id, product)
      .subscribe( (responseData) => {
        this.router.navigate(['/inputs/products']);
      });
  }
  deleteProduct(product_id: number) {
    this.http.delete<{message: string, data: any}>(BACKEND_URL + product_id)
      .subscribe( (responseData) => {
        console.log(responseData);
        const updateProducts = this.products.filter( product => product.id !== product_id);
        this.products = updateProducts;
        this.productssUpdated.next([...this.products]);
      });
  }
}
