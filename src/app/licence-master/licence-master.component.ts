import { LicenceState } from '../model/state-model';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { LicenceMasterFilter } from '../model/licence.model';
import { LoadMasterDtos, ChangeFilter } from '../model/actions';
import { LicenceMaster } from '../model/licence.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { datestructCheck, dsToDate } from '../shared/datestruct-utils';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'mp-support-master',
  templateUrl: './licence-master.component.html',
  styleUrls: ['./licence-master.component.scss']
})
export class LicenceMasterComponent implements OnInit, OnDestroy {

  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  checkDatatruct = datestructCheck;

  filteredData$: ReplaySubject<LicenceMaster[]>;

  filter$: Observable<LicenceMasterFilter>;
  data: Observable<LicenceMaster[]>;
  companyNames$: Observable<string[]>;
  productNames$: Observable<string[]>;
  supplierNames$: Observable<string[]>;

  maxDate;
  filterSubscription: Subscription;

  constructor(
    private router: Router,
    private store: Store) {
  }

  ngOnInit() {
    const today = new Date();
    this.maxDate = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate() };

    const mapToNames = map((c: []) => [null, ...c.map(a => a["name"])]);
    this.companyNames$ = this.store.select(LicenceState.getCompanies).pipe(mapToNames);
    this.productNames$ = this.store.select(LicenceState.getProducts).pipe(mapToNames);
    this.supplierNames$ = this.store.select(LicenceState.getSupplier).pipe(mapToNames)
    this.filter$ = this.store.select(LicenceState.getFilter).pipe(map(f => JSON.parse(JSON.stringify(f))));

    this.filteredData$ = new ReplaySubject<LicenceMaster[]>(1);

    this.store.dispatch(new LoadMasterDtos());

    this.filterSubscription = this.store.select(LicenceState.getFilter).subscribe(filter => {
      this.store.select(LicenceState.getMasterDtos).pipe(take(1)).subscribe((dtos) => {
        this.filterData(dtos, filter);
      })
    });
  }

  ngOnDestroy() {
    this.filterSubscription.unsubscribe();
  }

  onSort = (filter, event) => {
    filter.sorts = event.sorts;
    this.dispatchFilter(filter);
  }

  onPage = (filter, event) => {
    filter.offset = event.offset;
    this.dispatchFilter(filter);
  }

  dispatchFilter(filter) {
    this.store.dispatch(new ChangeFilter(filter));
  }

  private filterData(data: LicenceMaster[], filter: LicenceMasterFilter) {
    let filteredData = [...data];

    const master = filter.master;

    console.log("Filter", master);

    if (master.productName) {
      filteredData = filteredData.filter(d => d.productName.indexOf(master.productName) !== -1);
    }
    if (master.companyName) {
      filteredData = filteredData.filter(d => d.companyName === master.companyName);
    }
    if (master.supplierName) {
      filteredData = filteredData.filter(d => d.supplierName === master.supplierName);
    }
    if (master.lastUpdateDate) {
      filteredData = filteredData.filter(d => d.lastUpdateDate.getTime() > dsToDate(master.lastUpdateDate).getTime());
    }
    this.filteredData$.next(filteredData);
  }

  onNewClicked() {
    this.router.navigate(["details", "new"]);
  }

  onSelect($event: any) {
    if (!$event || $event.type !== 'click' || !$event.row) {
      return;
    }
    console.log("licence selected", $event);
    console.log("route to ", $event.row.id);
    this.router.navigate(["details", $event.row.id]);
  }


}
