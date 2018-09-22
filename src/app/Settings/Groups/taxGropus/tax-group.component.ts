import { Component } from '@angular/core';
import { TaxGroup } from './tax-group.model';

@Component({
  templateUrl: './tax-group.component.html',
  styleUrls: ['./tax-group.component.css']
})
export class TaxGroupComponent {
  editedtaxGroup: TaxGroup;

  onEdited(taxGroup: TaxGroup) {
    this.editedtaxGroup = taxGroup;
  }
}
