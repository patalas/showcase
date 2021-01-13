import { SaveLicence, DeleteLicence } from '../model/actions';
import { LicenceState } from '../model/state-model';
import { MessageDialogComponent } from '../shared/message-dialog/message-dialog.component';
import { AlertService } from '../shared/alert/alert.service';
import { DeleteComponent } from '../shared/delete/delete.component';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LicenceDetail, Key } from '../model/licence.model';
import { Observable, of, throwError } from "rxjs";
import { catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, take, tap } from "rxjs/operators";
import { Product, Supplier } from '../admin/admin.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { v4 as uuidv4 } from 'uuid';
import { dsToDate, dateToDs } from '../shared/datestruct-utils';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { LoadLicence, NewLicence } from '../model/actions';

@Component({
  selector: 'mp-support-detail',
  templateUrl: './licence-detail.component.html',
  styleUrls: ['./licence-detail.component.scss']
})
export class LicenceDetailComponent implements OnInit {

  readonly = false;
  form: FormGroup;
  keyForm: FormGroup;
  selectedKey: Key;

  searchProduct = false;
  lastSelectedProduct: Product = null;

  supplier$: Observable<Supplier[]>;
  products$: Observable<Product[]>;

  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  licence$: Observable<LicenceDetail>;
  licence: LicenceDetail;
  keySelection = [];

  constructor(private store: Store,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private alertService: AlertService,
    private builder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.supplier$ = this.store.select(LicenceState.getSupplier);
    this.products$ = this.store.select(LicenceState.getProducts);

    this.store.select(LicenceState.getDetail).pipe(filter(l => !!l), map(l => JSON.parse(JSON.stringify(l))),
      map((licence) => {
      this.lastSelectedProduct = licence.product;
      if (licence.keys) {
        licence.keys.forEach(k => k.uuid = uuidv4());
      }
      return licence;
    })).subscribe((l) => {
      this.licence = l;
      this.form = this.createForm(l);
      this.keyForm = this.builder.group({});
    });

    this.activatedRoute.params.subscribe(params => {
      if (params.id === 'new') {
        this.store.dispatch(new NewLicence(new LicenceDetail()));
      } else {
        console.log("loading licence with id", params.id);
        this.store.dispatch(new LoadLicence(+params.id)).subscribe(() => {}, (err) => {
          this.alertService.setAlertMessage('danger', 'Error loading details', err);
          this.navigateBack();
        });
      }
    });
  }

  private createForm(entry: LicenceDetail) {
    return this.builder.group({
      id: [entry.id],
      product: [entry.product, Validators.required],
      company: [entry.product ? entry.product.company.name : null],
      supplier: [entry.supplier],
      keys: [entry.keys, Validators.required],
      note: [entry.note]
    });
  }


  productSearch = (text: Observable<string>) => {
    return text.pipe(debounceTime(200), distinctUntilChanged())
      .pipe(filter(() => document.activeElement && document.activeElement.id === "product"), switchMap(term => {
        this.searchProduct = true;
        console.log("Search input", term);
        if (!term || term.length < 1) {
          return of([]);
        }
        return this.products$.pipe(take(1), map((products) => {
          return  products.filter(p => p.name.toLowerCase()
            .startsWith(term.toLowerCase()))
            .sort((a, b) => a.name.localeCompare(b.name));
        }));
      }), tap(() => this.searchProduct = false), catchError(err => {
        console.log("Error while searching:", err);
        this.searchProduct = false;
        return throwError(err);
      }));
  }

  productFormatter = (product) => {
    return product ? product.name : null;
  }


  onProductSelected(product: Product) {
    console.log("Product selected", product);
    this.lastSelectedProduct = product;
    this.form.controls.company.setValue(product.company.name);
  }

  checkProduct() {
    const product = this.form.controls.product.value;
    console.log("Check product", product);
    if (typeof (product.id) !== 'undefined') {
      return;
    }
    // Clean string attribute
    this.form.controls.product.setValue(this.lastSelectedProduct);
  }

  onKeySelect(selection: any) {
    if (!selection || !selection.selected) {
      return;
    }
    console.log("Key selected: ", selection.selected[0]);

    if (this.selectedKey === selection.selected[0]) {
      return;
    }

    if (this.selectedKey && !this.keyForm.valid) {
      console.log("Key in edit mode is invalid");
      console.log("Invalid", this.keyForm, this.selectedKey);
      this.keySelection = [this.selectedKey];
      return;
    }

    this.applyKeyChanges();
    this.selectedKey = selection.selected[0];
    this.createKeyForm(selection.selected[0]);
    this.keySelection = [this.selectedKey];
    console.log("form", this.form);
  }

  private applyKeyChanges() {
    if (!this.selectedKey) {
      return;
    }
    const key = this.keyForm.value;
    const date = dsToDate(key.validTo);
    key.validTo = date ? date.getTime() : null;
    const keys: Key[] = this.form.controls.keys.value;
    const index = keys.findIndex(k => k.uuid === this.keyForm.controls.uuid.value);
    keys[index] = key;
    this.form.patchValue({keys: [...keys]});
  }


  private createKeyForm(key: Key) {
    this.keyForm = this.builder.group({
      id: [key.id],
      key: [key.key, Validators.required],
      validTo: [key.validTo ? dateToDs(new Date(key.validTo)) : null],
      note: [key.note],
      uuid: [key.uuid]
    });

  }

  onCancel() {
    this.navigateBack();
  }

  private navigateBack() {
    this.router.navigate(["../../", { relativeTo: this.activatedRoute }]);
  }

  onDelete() {
    console.log("on delete clicked");
    const detailModalReference = this.modalService.open(DeleteComponent);
    const entry = this.form.value;

    detailModalReference.result.then(() => {
      console.log("delete confirmed", entry);
      this.store.dispatch(new DeleteLicence(entry.id)).subscribe(() => {
        console.log("on server deleted", entry);
        this.alertService.setAlertMessage("info", "Licence deleted");
        this.navigateBack();
      }, (err) => {
        console.log("error deleting adresse", err);
        this.alertService.setAlertMessage("danger", "Error while deleting licence", err);
      });
    }, () => {
      console.log("delete dialog cancelled");
    });
  }

  onSave(licence: LicenceDetail) {
    console.log("Valid:", this.form.invalid, this.keyForm.invalid);
    if (this.form.invalid || (this.selectedKey && this.keyForm.invalid)) {
      console.log("invalid object: ", this.form.value);
      Object.values(this.form.controls).forEach(c => c.markAsTouched());
      this.showLicenceInvalid();
      return;
    }
    this.applyKeyChanges();
    const newLicence = { ...licence, ...this.form.value } as LicenceDetail;
    newLicence.lastUpdateDate = new Date();
    newLicence.lastUpdatedBy = "Visitor";
    this.store.dispatch(new SaveLicence(newLicence)).subscribe(() => {
      console.log("Licence saved", newLicence);
      this.alertService.setAlertMessage('info', 'Data saved');
      this.navigateBack();
    });
  }

  private showLicenceInvalid() {
    const detailModalReference = this.modalService.open(MessageDialogComponent);
    detailModalReference.componentInstance.title = "Cannot save licence";
    detailModalReference.componentInstance.text = "Cannot save licence due validation erros. Please check all input fields.";
    detailModalReference.result.then(() => { }, () => { });
  }

  onNewKeyClicked() {
    console.log("New Key clicked");
    this.applyKeyChanges();
    const key = {uuid: uuidv4()} as Key;
    this.createKeyForm(key);
    const keys = [...this.form.value.keys, key];
    this.form.patchValue({keys: keys});
    this.selectedKey = key;
    this.keySelection = [this.selectedKey];
  }

  onDeleteKey() {
    if (!this.selectedKey) {
      console.error("no selected key, cannot delete");
      return;
    }
    const uuid = this.selectedKey.uuid;
    this.form.controls.keys.setValue([...this.form.controls.keys.value.filter(k => k.uuid !== uuid)]);
    this.keyForm = this.builder.group({});
    this.selectedKey = null;
    this.keySelection = [];
  }
}
