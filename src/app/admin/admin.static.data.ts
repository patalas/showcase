import { Product, Company, Supplier } from './admin.model';

export const adminSupplier: Supplier[] = [{
    id: 1,
    name: "Microsoft Licence"
}, {
    id: 2,
    name: "eBay"
}, {
    id: 3,
    name: "InteliJ"
}, {
    id: 4,
    name: "Amazon.com"
}, {
    id: 5,
    name: "Red Hat Store"
}];

export const adminCompanies: Company[] = [{
    id: 1,
    name: "Microsoft",
}, {
    id: 2,
    name: "Apple",
}, {
    id: 3,
    name: "IDEA",
}, {
    id: 4,
    name: "Adobe",
}, {
    id: 5,
    name: "Norton",
}, {
    id: 6,
    name: "GDATA",
}, {
    id: 7,
    name: "Google"
}, {
    id: 8,
    name: "Red Hat"
}];


export const adminProducts: Product[] = [{
    id: 1,
    name: "Windows 10",
    company: adminCompanies[0],
},
{
    id: 2,
    name: "InteliJ Pro",
    company: adminCompanies[2],
}, {
    id: 3,
    name: "Photoshop Windows",
    company: adminCompanies[3],
},
{
    id: 4,
    name: "Red Hat Enterprise Linux",
    company: adminCompanies[7],
},
{
    id: 5,
    name: "Windows XP",
    company: adminCompanies[0],
},
{
    id: 6,
    name: "Adwords",
    company: adminCompanies[6],
},
{
    id: 7,
    name: "Office 365",
    company: adminCompanies[0]
}
];

