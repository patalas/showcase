export interface Company {
    id: number;
    name: string;
}

export interface Product {
    id: number;
    name: string;
    company: Company;
}

export interface Supplier {
    id: number;
    name: string;
}
