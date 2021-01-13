import { LoadBaseData, SaveLicence, DeleteLicence, ChangeFilter, NewLicence, LoadLicence, LoadMasterDtos } from './actions';
import { LicenceService } from './../licence-detail/licence.service';
import { Company, Product, Supplier } from './../admin/admin.model';
import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { LicenceDetail, LicenceMaster, LicenceMasterFilter } from './licence.model';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { AlertService } from '../shared/alert/alert.service';

export interface LicenceStateModel {
  masterDtos: LicenceMaster[],
  detail: LicenceDetail,
  supplier: Supplier[],
  companies: Company[],
  products: Product[],
  filter: LicenceMasterFilter;
}


@State<LicenceStateModel>({
  name: 'LicenceStateModel',
  defaults: {
    masterDtos: [],
    detail: null,
    supplier: [],
    companies: [],
    products: [],
    filter: new LicenceMasterFilter()
  }
})
@Injectable({
  providedIn: 'root'
})
export class LicenceState {

  constructor(private service: LicenceService) { }

  @Selector()
  static getMasterDtos(state: LicenceStateModel) {
    return state.masterDtos;
  }

  @Selector()
  static getDetail(state: LicenceStateModel) {
    return state.detail;
  }

  @Selector()
  static getSupplier(state: LicenceStateModel) {
    return state.supplier;
  }

  @Selector()
  static getCompanies(state: LicenceStateModel) {
    return state.companies;
  }

  @Selector()
  static getProducts(state: LicenceStateModel) {
    return state.products;
  }

  @Selector()
  static getFilter(state: LicenceStateModel) {
    return state.filter;
  }

  @Action(LoadBaseData)
  loadBaseData({ patchState }: StateContext<LicenceStateModel>) {
    return forkJoin({
      products: this.service.loadProducts(),
      companies: this.service.loadCompanies(),
      supplier: this.service.loadSuppliers()
    }).pipe(map(result => {
      patchState({
        products: result.products,
        companies: result.companies,
        supplier: result.supplier
      })
    }));
  }

  @Action(LoadMasterDtos)
  loadMasterDtos({ patchState }: StateContext<LicenceStateModel>) {
    return this.service.loadMasterDtos().pipe(map(result => patchState({ masterDtos: result })));
  }

  @Action(NewLicence)
  newLicence({ patchState }: StateContext<LicenceStateModel>, { dto }: NewLicence) {
    patchState({
      detail: dto
    });
  }

  @Action(SaveLicence)
  saveLicence({ patchState }: StateContext<LicenceStateModel>, { dto }: SaveLicence) {
    return this.service.save(dto).pipe(map(result => {
      patchState({
        detail: result
      });
    }
    ));
  }

  @Action(LoadLicence)
  loadLicence({ patchState }: StateContext<LicenceStateModel>, { id }: LoadLicence) {
    return this.service.loadDetail(id).pipe(map(result => {
      patchState({
        detail: result
      });
    }
    ));
  }

  @Action(DeleteLicence)
  deleteLicence({ patchState }: StateContext<LicenceStateModel>, { dto }: DeleteLicence) {
    return this.service.delete(dto.id).pipe(map(() =>
      patchState({
        detail: null
      })
    ));
  }

  @Action(ChangeFilter)
  changeFilter({ patchState }: StateContext<LicenceStateModel>, { filter }: ChangeFilter) {
    patchState({
      filter: filter
    })
  }
}
