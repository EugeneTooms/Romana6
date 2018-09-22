import { Component, OnInit, OnDestroy } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

import { ArticlesService } from '../articles.service';
import { Article } from '../article.model';
import { SuppliersService } from '../../Suppliers/suppliers.service';
import { Supplier } from '../../Suppliers/supplier.model';



@Component({
    templateUrl : './article-input.component.html',
    styleUrls : ['./article-input.component.css']
})

export class ArticleInputComponent implements OnInit, OnDestroy {
  article: Article;
  suppliers: Supplier[] = [];
  private suppliersSub: Subscription;
  isLoading = true;
  isLinear = true;
  private mode = 'create';
  private articleId: number;
  formGroup: FormGroup;
  get formArray(): AbstractControl | null { return this.formGroup.get('formArray'); }

  constructor(
    private _formBuilder: FormBuilder,
    public articlesService: ArticlesService,
    public suppliersService: SuppliersService,
    public route: ActivatedRoute) {}

  fetchSuppliers() {
    this.suppliersService.getSuppliers();
    this.suppliersSub = this.suppliersService.getSuppliersListener()
      .subscribe((suppliers: Supplier[]) => {
        this.suppliers = suppliers;
      }, () => {this.isLoading = false; } );
  }

  ngOnInit() {
    this.fetchSuppliers();
    this.formGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          name: new FormControl(null, {validators : [Validators.required]}),
          tax_group_id: new FormControl(null, {validators : [Validators.required]}),
          price_buy: new FormControl(null, {validators : [Validators.required]}),
          price_sell: new FormControl(null, {validators : [Validators.required]}),
          unit: new FormControl(null, {validators : [Validators.required]}),
          art_show_gr_id: new FormControl(null, {validators : [Validators.required]}),
          prikaz_group_id: new FormControl(null, {validators : [Validators.required]})
        }),
        this._formBuilder.group({
          barcode: new FormControl(null),
          display: new FormControl(null),
          img_src: new FormControl(null),
        }),
        this._formBuilder.group({
          supplier_id: new FormControl(null),
          box_qty: new FormControl(null),
          qty: new FormControl(null),
        })
      ])
    });
    this.route.paramMap.subscribe( (paramMap: ParamMap) => {
      if (paramMap.has('articleId')) {
        this.mode = 'edit';
        this.articleId = +paramMap.get('articleId');
        this.article = this.articlesService.getArticle(this.articleId);
        this.isLoading = false;
        this.isLinear = false;
        this.formArray.get('0').setValue({
          name: this.article.name,
          tax_group_id: this.article.tax_group_id,
          price_buy: this.article.price_buy,
          price_sell: this.article.price_sell,
          unit: this.article.unit,
          art_show_gr_id: this.article.art_show_gr_id,
          prikaz_group_id: this.article.prikaz_group_id
        });
        this.formArray.get('1').setValue({
          barcode: this.article.barcode,
          display: this.article.display,
          img_src: this.article.img_src
        });
        this.formArray.get('2').setValue({
          supplier_id: this.article.supplier_id,
          box_qty: this.article.box_qty,
          qty: this.article.qty
        });
      } else {
        this.mode = 'create';
        this.articleId = null;
        this.isLoading = false;
      }
    });
  }

  SaveForm() {
    if (this.formArray.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.article = {
        // required
        id: null, // will get back id from the database
        name: this.formArray.get('0').value.name,
        tax_group_id: this.formArray.get('0').value.tax_group_id,
        price_buy: this.formArray.get('0').value.price_buy,
        price_sell: this.formArray.get('0').value.price_sell,
        unit: this.formArray.get('0').value.unit,
        art_show_gr_id: this.formArray.get('0').value.art_show_gr_id,
        prikaz_group_id: this.formArray.get('0').value.prikaz_group_id,
        // Optional
        barcode: this.formArray.get('1').value.barcode,
        display: this.formArray.get('1').value.display,
        img_src: this.formArray.get('1').value.img,
        // Ordering
        supplier_id: this.formArray.get('2').value.supplier_id,
        box_qty: this.formArray.get('2').value.box_qty,
        qty: this.formArray.get('2').value.qty
      };
      this.articlesService.addArticle(this.article);
    } else if (this.mode === 'edit') {
      const updatedarticle: Article = {
        // required
        id: this.article.id,
        name: this.formArray.get('0').value.name,
        tax_group_id: this.formArray.get('0').value.tax_group_id,
        price_buy: this.formArray.get('0').value.price_buy,
        price_sell: this.formArray.get('0').value.price_sell,
        unit: this.formArray.get('0').value.unit,
        art_show_gr_id: this.formArray.get('0').value.art_show_gr_id,
        prikaz_group_id: this.formArray.get('0').value.prikaz_group_id,
        // Optional
        barcode: this.formArray.get('1').value.barcode,
        display: this.formArray.get('1').value.display,
        img_src: this.formArray.get('1').value.img,
        // Ordering
        supplier_id: this.formArray.get('2').value.supplier_id,
        box_qty: this.formArray.get('2').value.box_qty,
        qty: this.formArray.get('2').value.qty
      };
      this.articlesService.updateArticle(updatedarticle);
    }
  }
  ngOnDestroy() {
    this.suppliersSub.unsubscribe();
  }
}
