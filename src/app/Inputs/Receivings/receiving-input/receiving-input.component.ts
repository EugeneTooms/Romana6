import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { PopUpSelectorComponent } from '../../../popUpSelector/pop-up-selector.components';

import { Supplier } from '../../Suppliers/supplier.model';
import { Receiving } from '../receiving.model';
import { ReceivingDetails } from '../receiving-details.model';
import { SuppliersService } from '../../Suppliers/suppliers.service';
import { ReceivingsService } from '../receivings.service';

@Component({
  templateUrl: './receiving-input.component.html',
  styleUrls: ['./receiving-input.component.css']
})
export class ReceivingInputComponent implements OnInit, OnDestroy {
  isLoading = true;
  suppliers: Supplier[] = [];
  private supplierSub: Subscription;
  private receivingDetailsSub: Subscription;
  receiving: Receiving;
  receivingDetails: ReceivingDetails[] = [];
  articlesToRemove: ReceivingDetails[] = [];
  private mode = 'create';
  private receivingId: number;

  displayedColumns: string[] = ['id', 'name', 'amount', 'delete'];
  dataSource = new MatTableDataSource(this.receivingDetails);

  constructor(
    private dialog: MatDialog,
    public suppliersService: SuppliersService,
    public receivingsService: ReceivingsService,
    public route: ActivatedRoute
    ) {}

  fetchSuppliers() {
    this.suppliersService.getSuppliers();
    this.supplierSub = this.suppliersService.getSuppliersListener()
      .subscribe((suppliers: Supplier[]) => {
        this.suppliers = suppliers;
      }, () => {this.isLoading = false; } );
  }
  fetchReceivingDetails() {
    this.receivingsService.getReceivingDetails(this.receivingId);
    this.receivingDetailsSub = this.receivingsService.getReceivingDetailsListener()
      .subscribe((receivingDetails: ReceivingDetails[]) => {
        this.receivingDetails = receivingDetails;
        this.dataSource.data = this.receivingDetails;
      }, () => {this.isLoading = false; } );
  }

  ngOnInit() {
    this.isLoading = true;
    this.fetchSuppliers();
    this.route.paramMap.subscribe( (paramMap: ParamMap) => {
      if (paramMap.has('receivingId')) {
        this.mode = 'edit';
        this.receivingId = +paramMap.get('receivingId');
        this.receivingsService.getReceiving(this.receivingId)
          .subscribe(receivingData => {
            this.receiving = {
              id: receivingData.data[0].id,
              supplier_id: receivingData.data[0].supplier_id,
              supplier_name: receivingData.data[0].supplier_name,
              price_buy: receivingData.data[0].price_buy,
              price_sell: receivingData.data[0].price_sell,
              number: receivingData.data[0].number,
              date: receivingData.data[0].date,
              document_Date: receivingData.data[0].document_Date,
              posted: receivingData.data[0].posted,
            };
          }, () => {this.isLoading = false; } );
        this.fetchReceivingDetails();
        this.isLoading = false;
      } else {
        this.receiving = {
          id: null,
          supplier_id: null,
          supplier_name: null,
          price_buy: null,
          price_sell: null,
          number: null,
          date: null,
          document_Date: null,
          posted: null,
        };
        this.mode = 'create';
        this.receivingId = null;
        this.isLoading = false;
      }
    });
  }
  SaveReceiving(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.receiving = {id: this.receiving.id,
      number: form.value.number,
      supplier_id: form.value.supplier_id,
      price_buy: form.value.price_buy,
      document_Date: form.value.document_Date};
    this.receivingDetails = this.dataSource.data;
    if (this.mode === 'create') {
      this.receivingsService.addReceiving(this.receiving, this.receivingDetails);
    }
    if (this.mode === 'edit') {
      this.receivingsService.updateReceiving(this.receiving, this.receivingDetails, this.articlesToRemove);
    }
    form.resetForm();
  }
  RemoveArticle(table_id: number) {
    if (table_id) {
      const toremove: ReceivingDetails = {table_id: table_id};
      this.articlesToRemove.push(toremove);
    }
    const updatedReceivingDetails = this.receivingDetails.filter( article => article.table_id !== table_id);
    this.receivingDetails = updatedReceivingDetails;
    this.dataSource.data = updatedReceivingDetails;
  }
  AddArticle() {
    const dialogRef = this.dialog.open(PopUpSelectorComponent, {
      height: '90%',
      width: '70%',
      data: {data: 'Article'}});

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (!(this.receivingDetails.find( article => article.article_id === result.id)))  {
          const newarticle: ReceivingDetails = {table_id: null, article_id: result.id, name: result.name, amount: null};
          this.receivingDetails.push(newarticle);
          this.dataSource.data = this.receivingDetails;
        }
      }
    });
  }
  ngOnDestroy() {
    this.supplierSub.unsubscribe();
    if (this.mode === 'edit') {
      this.receivingDetailsSub.unsubscribe();
    }
  }
}
