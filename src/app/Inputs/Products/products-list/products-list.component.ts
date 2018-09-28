import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs';

import { Product } from '../product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  private productSub: Subscription;
  isLoading = true;

  displayedColumns: string[] = ['id', 'name' , 'Select', 'Edit', 'Delete', 'Add'];
  dataSource = new MatTableDataSource(this.products);

  constructor (public productsService: ProductsService) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.productsService.getProducts();
    this.productSub = this.productsService.getProductsListener()
      .subscribe((products: Product[]) => {
        this.products = products;
        this.dataSource.data = this.products;
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      }, () => {this.isLoading = false; });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.productSub.unsubscribe();
  }
  DeleteArticle(id: number) {
    this.productsService.deleteProduct(id);
  }
}
