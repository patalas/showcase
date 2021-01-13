import { LicenceMaster, LicenceDetail } from '../model/licence.model';
import { adminProducts, adminSupplier } from '../admin/admin.static.data';


const michael = "Michael Patalas";

export const detailToMaster = (dto: LicenceDetail) => {
    return {
        id: dto.id,
        lastUpdateDate: dto.lastUpdateDate,
        companyName: dto.product.company.name,
        productName: dto.product.name,
        supplierName: dto.supplier ? dto.supplier.name : null,
    } as LicenceMaster;
};

export const dtos: LicenceDetail[] = [{
    id: 1,
    createdBy: michael,
    createdDate: new Date(Date.UTC(2020, 5, 1)),
    lastUpdatedBy: michael,
    lastUpdateDate: new Date(Date.UTC(2020, 5, 3)),
    supplier: adminSupplier[0],
    product: adminProducts[0],
    note: "My Windows 10 Pro licence for office work and home.",
    keys: [{
        id: 1,
        key: '4321-ABCD-9876-FG00',
        validTo: new Date(Date.UTC(2020, 1, 1)).getTime(),
        note: "Office",
        uuid: null
    }, {
        id: 2,
        key: '9321-ABCD-9876-FG00',
        validTo: new Date(Date.UTC(2022, 1, 1)).getTime(),
        note: "Home usage only!",
        uuid: null
    }]
}, {
    id: 2,
    createdBy: michael,
    createdDate: new Date(Date.UTC(2020, 1, 1)),
    lastUpdatedBy: michael,
    lastUpdateDate: new Date(Date.UTC(2020, 1, 20)),
    supplier: adminSupplier[3],
    product: adminProducts[2],
    note: "For graphic use at home",
    keys: [{
        id: 3,
        key: '8E86EA1F8EC9C',
        validTo: new Date(Date.UTC(2022, 1, 1)).getTime(),
        note: "Office machine 1",
        uuid: null
    }, {
        id: 4,
        key: 'E925A4C8188B6',
        validTo: new Date(Date.UTC(2024, 1, 1)).getTime(),
        note: "Office machine 2",
        uuid: null
    }, {
        id: 11,
        key: 'KMoQWtJpyO124',
        validTo: new Date(Date.UTC(2024, 1, 1)).getTime(),
        note: "Office machine 3",
        uuid: null
    }]
}, {
    id: 3,
    createdBy: michael,
    createdDate: new Date(Date.UTC(2019, 1, 1)),
    lastUpdatedBy: michael,
    lastUpdateDate: new Date(Date.UTC(2019, 8, 10)),
    supplier: adminSupplier[2],
    product: adminProducts[1],
    note: "Java work",
    keys: [{
        id: 5,
        key: 'BF4DF4E4322128CE',
        validTo: new Date(Date.UTC(2022, 1, 1)).getTime(),
        note: "For Server A",
        uuid: null
    }, {
        id: 6,
        key: '7AC5ED44F3F36D7D',
        validTo: new Date(Date.UTC(2022, 1, 1)).getTime(),
        note: "For Server B",
        uuid: null
    }, {
        id: 7,
        key: 'DE81E41F42E1F3D4',
        validTo: new Date(Date.UTC(2022, 1, 1)).getTime(),
        note: "For Server C",
        uuid: null
    }]
}, {
    id: 4,
    createdBy: michael,
    createdDate: new Date(Date.UTC(1999, 1, 1)),
    lastUpdatedBy: michael,
    lastUpdateDate: new Date(Date.UTC(2017, 3, 29)),
    supplier: adminSupplier[4],
    product: adminProducts[3],
    note: "Server licences",
    keys: [{
        id: 8,
        key: 'kCKkv1eVBB$?Ztt6A00f',
        validTo: new Date(Date.UTC(2022, 1, 1)).getTime(),
        note: "Office in Vienna",
        uuid: null
    }, {
        id: 9,
        key: '9U#U94g1KHW96KJ#tsBq$?Ztt6A00f',
        validTo: new Date(Date.UTC(2023, 1, 1)).getTime(),
        note: "Office in London",
        uuid: null
    }, {
        id: 10,
        key: 'bAeE9RhUgBY9nLjQ1noi2KaqTtIRNv5E',
        validTo: new Date(Date.UTC(2024, 1, 1)).getTime(),
        note: "Office in Warsaw",
        uuid: null
    },{
        id: 10,
        key: 'TIV01dbgsDwPzx0z4E1rMABTP59d1GfB',
        validTo: new Date(Date.UTC(2025, 1, 1)).getTime(),
        note: "Office in Berlin",
        uuid: null
    }]
}];
