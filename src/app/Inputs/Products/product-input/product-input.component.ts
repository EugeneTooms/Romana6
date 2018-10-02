import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatDialog } from '@angular/material';


import { ProductsService } from '../products.service';
import { TaxGroupService } from '../../../Settings/Groups/taxGropus/tax-group.service';
import { TaxGroup } from '../../../Settings/Groups/taxGropus/tax-group.model';
import { Product } from '../product.model';
import { ProductDetails } from '../product-details.model';
import { PopUpSelectorComponent } from '../../../popUpSelector/pop-up-selector.components';


@Component({
  templateUrl: './product-input.component.html',
  styleUrls: ['./product-input.component.css']
})

export class ProductInputComponent implements OnInit, OnDestroy {
  isLoading = true;
  taxGroups: TaxGroup [] = [];
  private taxSub: Subscription;
  private productDetailsSub: Subscription;
  product: Product;
  productDetails: ProductDetails[] = [];
  articlesToRemove: ProductDetails[] = [];
  private mode = 'create';
  private productId: number;


  displayedColumns: string[] = ['id', 'name', 'amount', 'delete'];
  dataSource = new MatTableDataSource(this.productDetails);
  constructor(
    private dialog: MatDialog,
    public productsService: ProductsService,
    public taxGroupService: TaxGroupService,
    public route: ActivatedRoute) {}

  fetchTaxGroups() {
    this.taxGroupService.getTaxGroups();
    this.taxSub = this.taxGroupService.getTaxGroupsListener()
      .subscribe((taxgroups: TaxGroup[]) => {
        this.taxGroups = taxgroups;
      }, () => {this.isLoading = false; } );
  }
  fetchProductDetails() {
    this.productsService.getProductDetails(this.productId);
    this.productDetailsSub = this.productsService.getProductDetailsListener()
      .subscribe((productDetails: ProductDetails[]) => {
        this.productDetails = productDetails;
        this.dataSource.data = this.productDetails;
      }, () => {this.isLoading = false; } );
  }

  ngOnInit() {
    this.isLoading = true;
    this.fetchTaxGroups();
    this.route.paramMap.subscribe( (paramMap: ParamMap) => {
      if (paramMap.has('productId')) {
        this.mode = 'edit';
        this.productId = +paramMap.get('productId');
        this.productsService.getProduct(this.productId)
          .subscribe(productData => {
            this.product = {
              id: productData.data[0].id,
              name: productData.data[0].name,
              tax_group_id: productData.data[0].tax_group_id,
              price: productData.data[0].price,
              price_1: productData.data[0].price_1,
              price_2: productData.data[0].price_2,
              price_3: productData.data[0].price_3,
              price_4: productData.data[0].price_4,
            };
          }, () => {this.isLoading = false; } );
        this.fetchProductDetails();
        this.isLoading = false;
      } else {
        this.product = {
          id: null,
          name: null,
          tax_group_id: null,
          price: null,
          price_1: null,
          price_2: null,
          price_3: null,
          price_4: null,
        };
        this.mode = 'create';
        this.productId = null;
        this.isLoading = false;
      }
    });
  }
  RemoveArticle(table_id: number, article_id: number) {
    if (table_id) {
      const toremove: ProductDetails = {table_id: table_id};
      this.articlesToRemove.push(toremove);
    }
    const updateProductDetails = this.productDetails.filter( article => article.id !== article_id);
    this.productDetails = updateProductDetails;
    this.dataSource.data = updateProductDetails;
  }
  SaveProduct(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.product = {id: this.product.id, name: form.value.name, tax_group_id: form.value.tax_group, price: form.value.price};
    this.productDetails = this.dataSource.data;
    if (this.mode === 'create') {
      this.productsService.addProduct(this.product, this.productDetails);
    }
    if (this.mode === 'edit') {
      this.productsService.updateProduct(this.product, this.productDetails, this.articlesToRemove);
    }
    form.resetForm();
  }

  AddArticle() {
    const dialogRef = this.dialog.open(PopUpSelectorComponent, {
      height: '90%',
      width: '70%',
      data: {data: 'Article'}});

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (!(this.productDetails.find( article => article.id === result.id)))  {
          const newproduct: ProductDetails = {table_id: null, id: result.id, name: result.name, amount: null};
          this.productDetails.push(newproduct);
          this.dataSource.data = this.productDetails;
        }
      }
    });
  }


  ngOnDestroy() {
    this.taxSub.unsubscribe();
    if (this.mode === 'edit') {
      this.productDetailsSub.unsubscribe();
    }
  }
}
