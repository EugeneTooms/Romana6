import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment} from '../../../environments/environment';

import { Receiving } from './receiving.model';
import { ReceivingDetails } from './receiving-details.model';

const BACKEND_URL = environment.apiURL + 'receivings/';
@Injectable({providedIn : 'root'})
export class ReceivingsService {
  private receivings: Receiving[] = [];
  private receivingDetails: ReceivingDetails[] = [];
  private receivingsUpdated = new Subject<Receiving[]>();
  private receivingDetailsUpdated = new Subject<ReceivingDetails[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getReceivingsListener() {
    return this.receivingsUpdated.asObservable();
  }
  getReceivingDetailsListener() {
    return this.receivingDetailsUpdated.asObservable();
  }

  getReceivings() {
    this.http.get<{message: string, data: any}>(BACKEND_URL)
      .pipe(map((receivingsData) => {
        return  receivingsData.data.map( receiving => {
          return {
            id: receiving.id,
            supplier_id: receiving.supplier_id,
            supplier_name: receiving.supplier_name,
            price_buy : receiving.price_buy,
            price_sell : receiving.price_sell,
            number: receiving.number,
            date: receiving.date,
            document_Date: receiving.document_Date,
            posted: receiving.posted
          };
        });
      }))
      .subscribe((transReceivings) => {
        this.receivings = transReceivings;
        this.receivingsUpdated.next([...this.receivings]);
      });
  }
  getReceivingDetails(id: number) {
    this.http.get<{message: string, data: any}>(BACKEND_URL + 'details/' + id)
      .pipe(map((receivingData) => {
        return  receivingData.data.map( article => {
          return {
            table_id: article.id,
            receiving_id: article.receiving_id,
            article_id: article.article_id,
            name: article.name,
            amount: article.amount,
            price_buy: article.price_buy,
            price: article.price,
            discount: article.discount
          };
        });
      }))
      .subscribe((transReceivingDetails) => {
        this.receivingDetails = transReceivingDetails;
        this.receivingDetailsUpdated.next([...this.receivingDetails]);
      });
  }
  getReceiving(id: number) {
    return this.http.get<{message: string, data: any}>(BACKEND_URL + id);
  }

  // addReceiving(product: Product, productDetails: ProductDetails[]) {
  //   this.http.post<{message: string, data: number}>(BACKEND_URL, {product, productDetails})
  //     .subscribe( (responseData) => {
  //       product.id = responseData.data;
  //       this.products.push(product);
  //       this.productsUpdated.next([...this.products]);
  //       this.router.navigate(['/inputs/products']);
  //     });
  // }
  // updateReceiving(product: Product, productDetails: ProductDetails[], removedDetails: ProductDetails[]) {
  //   this.http.put<{message: string, data: number}>(BACKEND_URL + product.id, {product, productDetails, removedDetails})
  //     .subscribe( (responseData) => {
  //       this.router.navigate(['/inputs/products']);
  //     });
  // }
  DeleteReceiving(receiving_id: number) {
    this.http.delete<{message: string, data: any}>(BACKEND_URL + receiving_id)
      .subscribe( (responseData) => {
        const updateReceivings = this.receivings.filter( receiving => receiving.id !== receiving_id);
        this.receivings = updateReceivings;
        this.receivingsUpdated.next([...this.receivings]);
      });
  }
}
