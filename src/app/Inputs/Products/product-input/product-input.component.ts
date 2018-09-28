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
  private mode = 'create';
  private productId: number;


  displayedColumns: string[] = ['article_id', 'name', 'amount', 'delete'];
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
        this.mode = 'create';
        this.productId = null;
        this.isLoading = false;
      }
    });
  }
  RemoveArticle(article_id: number) {
    const updateProductDetails = this.productDetails.filter( article => article.article_id !== article_id);
    this.productDetails = updateProductDetails;
    this.dataSource.data = this.productDetails;
  }
  SaveProduct(form: NgForm) {}

  AddArticle() {
    const dialogRef = this.dialog.open(PopUpSelectorComponent, {
      height: '90%',
      width: '70%',
      data: {data: 'Article'}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }


  ngOnDestroy() {
    this.taxSub.unsubscribe();
    this.productDetailsSub.unsubscribe();
  }
}
