import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TaxGroupService } from '../tax-group.service';
import { TaxGroup } from '../tax-group.model';

@Component({
  selector: 'app-tax-group-input',
  templateUrl: './tax-group-input.component.html',
  styleUrls: ['./tax-group-input.component.css']
})
export class TaxGroupInputComponent {
  @Input() editingTaxGroup: TaxGroup;
  constructor (public taxGroupService: TaxGroupService) {}

  AddTaxGroup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.editingTaxGroup) {
      this.editingTaxGroup.name = form.value.name;
      this.editingTaxGroup.tax_1 = form.value.tax_1;
      this.editingTaxGroup.tax_2 = form.value.tax_2;
      this.taxGroupService.updateTaxGroup(this.editingTaxGroup);
      this.editingTaxGroup = null;
      form.resetForm();
    } else {
      this.taxGroupService.addTaxGroup(form.value.name, form.value.tax_1, form.value.tax_2);
      form.resetForm();
    }
  }
}
