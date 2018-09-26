import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from './product.model';
import { Subscription } from 'rxjs';
import { ProductsService } from './products.service';

@Component({
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  private productsSub: Subscription;

  constructor (public productsService: ProductsService) {}

  ngOnInit() {
    this.productsService.getProducts();
    this.productsSub = this.productsService.getProductsListener()
      .subscribe((products: Product[]) => {
        this.products = products;
      });
  }
  ngOnDestroy() {
    this.productsSub.unsubscribe();
  }
}
