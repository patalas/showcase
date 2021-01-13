import { LicenceDetail, LicenceMasterFilter } from './licence.model';

export class LoadBaseData {
  static readonly type = "Load base data";

  constructor() {}
}

export class LoadMasterDtos {
  static readonly type = "Load master dtps";

  constructor() {}
}

export class NewLicence {
  static readonly type = "New licence";
  constructor(public dto: LicenceDetail) {}
}

export class SaveLicence {
  static readonly type = "Save licence";
  constructor(public dto: LicenceDetail) {}
}

export class LoadLicence {
  static readonly type = "Load licence";
  constructor(public id: number) {}
}

export class DeleteLicence {
  static readonly type = "Delete licence";

  constructor(public dto: LicenceDetail) {}
}


export class ChangeFilter {
  static readonly type = "Change Filter";

  constructor(public filter: LicenceMasterFilter) {}
}
