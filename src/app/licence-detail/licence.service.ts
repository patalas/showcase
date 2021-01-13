import { Observable, of, throwError } from 'rxjs';
import { adminProducts, adminSupplier, adminCompanies } from '../admin/admin.static.data';
import { Injectable } from '@angular/core';
import { LicenceMaster, LicenceDetail, LicenceMasterFilter } from '../model/licence.model';
import { dtos, detailToMaster } from './licence.static.data';
import { Product, Supplier, Company } from '../admin/admin.model';

@Injectable({
  providedIn: 'root'
})
export class LicenceService {

  private entities = [...dtos];

  constructor() {
   }

  loadMasterDtos(): Observable<LicenceMaster[]> {
    return of(this.entities.map(detailToMaster));
  }

  loadDetail(searchId: number): Observable<LicenceDetail> {
    const detail = this.entities.find(d => d.id === searchId);
    if (!detail) {
      return throwError("Cannot load details: " + searchId);
    }
    return of(detail);
  }

  loadProducts(): Observable<Product[]> {
    return of ([...adminProducts].sort((a, b) => a.name.localeCompare(b.name)));
  }

  loadSuppliers(): Observable<Supplier[]> {
    return of ([...adminSupplier].sort((a, b) => a.name.localeCompare(b.name)));
  }

  loadCompanies(): Observable<Company[]> {
    return of ([...adminCompanies].sort((a, b) => a.name.localeCompare(b.name)));
  }

  save(entry: LicenceDetail): Observable<LicenceDetail> {
    if (entry.id) {
      this.entities = [...this.entities.filter(e => e.id !== entry.id), entry];
    } else {
      entry.id = this.entities.length + 2;
      this.entities.push(entry);
    }
    return of(entry);
  }

  delete(entryId: number): Observable<{}> {
    this.entities = [...this.entities.filter(e => e.id !== entryId)];
    return of({});
  }

}
