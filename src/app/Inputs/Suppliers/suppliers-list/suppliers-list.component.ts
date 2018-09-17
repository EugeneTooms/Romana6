import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs';

import { Supplier } from '../supplier.model';
import { SuppliersService } from '../suppliers.service';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './suppliers-list.component.html',
  styleUrls: ['./suppliers-list.component.css']
})
export class SuppliersListComponent implements OnInit, OnDestroy {

  suppliers: Supplier[] = [];
  private suppliersSub: Subscription;
  isLoading = true;

  displayedColumns: string[] = ['id', 'name' , 'Select', 'Edit', 'Delete', 'Add'];
  dataSource = new MatTableDataSource(this.suppliers);

  constructor (public suppliersService: SuppliersService) {}
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.suppliersService.getSuppliers();
    this.suppliersSub = this.suppliersService.getSuppliersListener()
      .subscribe((suppliers: Supplier[]) => {
        this.suppliers = suppliers;
        this.dataSource.data = this.suppliers;
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  DeleteSupplier(id: number) {

  }
  ngOnDestroy() {
    this.suppliersSub.unsubscribe();
  }
}
