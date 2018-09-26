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

    this.http.get<{message: string, products: any, articles: any}>(BACKEND_URL)
      .pipe(map((productsData) => {
        return  productsData.products.map( product => {
          return {
            id: product.id,
            name: product.name,
            tax_group_id : product.tax_group_id,
            price: product.price,
            price_1: product.price_1,
            price_2: product.price_2,
            price_3: product.price_3,
            price_4: product.price_4
          };
        });
      }))
      .subscribe((transProducts) => {
        console.log(transProducts);
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
