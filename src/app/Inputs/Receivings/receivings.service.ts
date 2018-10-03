import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment} from '../../../environments/environment';



const BACKEND_URL = environment.apiURL + 'receivings/';
@Injectable({providedIn : 'root'})
export class ReceivingsService {


  constructor(private http: HttpClient, private router: Router) {}

  // getProductsListener() {
  //   return this.productsUpdated.asObservable();
  // }
  // getProductDetailsListener() {
  //   return this.productsDetailsUpdated.asObservable();
  // }

  // getProducts() {
  //   this.http.get<{message: string, data: any}>(BACKEND_URL)
  //     .pipe(map((productsData) => {
  //       return  productsData.data.map( product => {
  //         return {
  //           id: product.id,
  //           name: product.name,
  //           tax_group_id : product.tax_group_id,
  //           price: product.price,
  //           price_1: product.price_1,
  //           price_2: product.price_2,
  //           price_3: product.price_3,
  //           price_4: product.price_4
  //         };
  //       });
  //     }))
  //     .subscribe((transProducts) => {
  //       this.products = transProducts;
  //       this.productsUpdated.next([...this.products]);
  //     });
  // }
  // getProductDetails(id: number) {
  //   this.http.get<{message: string, data: any}>(BACKEND_URL + 'details/' + id)
  //     .pipe(map((productsData) => {
  //       return  productsData.data.map( article => {
  //         return {
  //           table_id: article.id,
  //           id: article.article_id,
  //           name: article.name,
  //           amount : article.amount,
  //         };
  //       });
  //     }))
  //     .subscribe((transProductDetails) => {
  //       this.productDetails = transProductDetails;
  //       this.productsDetailsUpdated.next([...this.productDetails]);
  //     });
  // }
  // getProduct(id: number) {
  //   return this.http.get<{message: string, data: any}>(BACKEND_URL + id);
  // }

  // addProduct(product: Product, productDetails: ProductDetails[]) {
  //   this.http.post<{message: string, data: number}>(BACKEND_URL, {product, productDetails})
  //     .subscribe( (responseData) => {
  //       product.id = responseData.data;
  //       this.products.push(product);
  //       this.productsUpdated.next([...this.products]);
  //       this.router.navigate(['/inputs/products']);
  //     });
  // }
  // updateProduct(product: Product, productDetails: ProductDetails[], removedDetails: ProductDetails[]) {
  //   this.http.put<{message: string, data: number}>(BACKEND_URL + product.id, {product, productDetails, removedDetails})
  //     .subscribe( (responseData) => {
  //       this.router.navigate(['/inputs/products']);
  //     });
  // }
  // deleteProduct(product_id: number) {
  //   this.http.delete<{message: string, data: any}>(BACKEND_URL + product_id)
  //     .subscribe( (responseData) => {
  //       console.log(responseData);
  //       const updateProducts = this.products.filter( product => product.id !== product_id);
  //       this.products = updateProducts;
  //       this.productsUpdated.next([...this.products]);
  //     });
  // }
}
