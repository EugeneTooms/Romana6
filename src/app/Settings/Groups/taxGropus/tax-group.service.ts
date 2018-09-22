import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment} from '../../../../environments/environment';
import { TaxGroup } from './tax-group.model';


const BACKEND_URL = environment.apiURL + 'taxgroup/';
@Injectable({providedIn : 'root'})
export class TaxGroupService {
  private taxGroups: TaxGroup[] = [];
  private taxGroupsUpdated = new Subject<TaxGroup[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getTaxGroups() {
    this.http.get<{message: string, data: any}>(BACKEND_URL)
      .pipe(map((taxGroupData) => {
        return taxGroupData.data.map( taxGroup => {
          return {
            id: taxGroup.id,
            name: taxGroup.name,
            tax_1: taxGroup.tax_1,
            tax_2: taxGroup.tax_2
          };
        });
      }))
      .subscribe(transtaxGroups => {
        this.taxGroups = transtaxGroups;
        this.taxGroupsUpdated.next([...this.taxGroups]);
      });
  }
  gettaxGroup(id: number) {
    return {...this.taxGroups.find(taxGroup => taxGroup.id === id)};
  }
  getTaxGroupsListener() {
    return this.taxGroupsUpdated.asObservable();
  }
  addTaxGroup(name: string, tax_1: number, tax_2: number) {
    const taxGroup: TaxGroup = {id: null, name: name, tax_1: tax_1, tax_2: tax_2};
    this.http.post<{message: string, data: number}>(BACKEND_URL, taxGroup)
      .subscribe( (responseData) => {
        taxGroup.id = responseData.data;
        this.taxGroups.push(taxGroup);
        this.taxGroupsUpdated.next([...this.taxGroups]);
      });
  }
  updateTaxGroup(taxGroup: TaxGroup) {
    this.http.put<{message: string, data: number}>(BACKEND_URL + taxGroup.id, taxGroup)
      .subscribe( (responseData) => {
      });
  }
  deleteTaxGroup(taxGroup_id: number) {
    this.http.delete<{message: string, data: any}>(BACKEND_URL + taxGroup_id)
      .subscribe( (responseData) => {
        console.log(responseData);
        const updatedtaxGroups = this.taxGroups.filter( taxGroup => taxGroup.id !== taxGroup_id);
        this.taxGroups = updatedtaxGroups;
        this.taxGroupsUpdated.next([...this.taxGroups]);
      });
  }
}
