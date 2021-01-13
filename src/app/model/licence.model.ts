import { Product, Supplier } from '../admin/admin.model';

export interface Key {
    id: number;
    key: string;
    validTo: number;
    note: string;
    uuid: string; // not saved
}

export class LicenceMasterFilter {
    sorts = [{prop: 'lastUpdateDate', dir: 'desc'}];
    offset = 0;
    master = new LicenceMaster();
}

export class LicenceMaster {
    id: number = null;
    lastUpdateDate: Date = null;

    companyName: string = null;
    productName: string = null;

    supplierName: string = null;
}

export enum LicenceStatus {
    VALID = "VALID",
    INVALID = "INVALID",
}

export class LicenceDetail {
    id: number;
    createdBy: string;
    createdDate: Date;

    lastUpdatedBy: string;
    lastUpdateDate: Date;

    supplier: Supplier;
    product: Product;
    note: string;

    keys: Key[] = [];
}
