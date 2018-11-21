import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs';

import { Receiving } from '../receiving.model';
import { ReceivingsService } from '../receivings.service';

@Component({
  selector: 'app-receivings-list',
  templateUrl: './receivings-list.component.html',
  styleUrls: ['./receivings-list.component.css']
})
export class ReceivingsListComponent implements OnInit, OnDestroy {
  receivings: Receiving[] = [];
  private receivingSub: Subscription;
  isLoading = true;

  displayedColumns: string[] = ['id', 'number' , 'Select', 'Edit', 'Delete', 'Add'];
  dataSource = new MatTableDataSource(this.receivings);

  constructor (public receivingsService: ReceivingsService) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.receivingsService.getReceivings();
    this.receivingSub = this.receivingsService.getReceivingsListener()
      .subscribe((receivings: Receiving[]) => {
        this.receivings = receivings;
        this.dataSource.data = this.receivings;
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      }, () => {this.isLoading = false; });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.receivingSub.unsubscribe();
  }
  DeleteReceiving(id: number) {
    this.receivingsService.DeleteReceiving(id);
  }

}
