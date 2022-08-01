export type totalSalesByVendor = {
    V1: number;
    V2: number;
    V3: number;
}

export type vendorSalesByDate = {
    dates: string[];
    V1: number[];
    V2: number[];
    V3: number[];
}

interface storeType {
    vendorSalesByDate: vendorSalesByDate;
    totalSalesByVendor: totalSalesByVendor;
}

export default storeType;
