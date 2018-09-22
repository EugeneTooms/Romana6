import { Component, ViewChild, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs';

import { TaxGroup } from '../tax-group.model';
import { TaxGroupService } from '../tax-group.service';

@Component({
  selector: 'app-tax-group-list',
  templateUrl: './tax-group-list.component.html',
  styleUrls: ['./tax-group-list.component.css']
})
export class TaxGroupListComponent implements OnInit, OnDestroy {
  isLoading = true;
  taxGroups: TaxGroup[] = [];
  private taxSub: Subscription;
  @Output() editTaxGroup = new EventEmitter();

  displayedColumns: string[] = ['id', 'name' , 'tax_1' , 'tax_2' , 'Edit', 'Delete'];
  dataSource = new MatTableDataSource(this.taxGroups);

  constructor (public taxGroupService: TaxGroupService) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.taxGroupService.getTaxGroups();
    this.taxSub = this.taxGroupService.getTaxGroupsListener()
      .subscribe((taxGroups: TaxGroup[]) => {
        this.taxGroups = taxGroups;
        this.dataSource.data = this.taxGroups;
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      }, () => {this.isLoading = false; });

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.taxSub.unsubscribe();
  }
  DeleteTaxGroup(id: number) {
    this.taxGroupService.deleteTaxGroup(id);
  }
  EditTaxGroup(taxGroup: TaxGroup) {
    console.log(taxGroup);
    this.editTaxGroup.emit(taxGroup);
  }
}
