import { saveTotalSalesByVendorActionCretor, saveVendorSalesByDateActionCretor } from "../types/actionCreatorType";


export const saveVendorSalesByDate: saveVendorSalesByDateActionCretor = (vendorSales: any) => {
    return {
        type: 'SAVE_VENDOR_SALES_BY_DATE',
        vendorSales
    };
};

export const saveTotalSalesByVendor: saveTotalSalesByVendorActionCretor = (vendorSalesByDate: any) => {
    return {
        type: 'SAVE_TOTAL_SALES_BY_VENDOR',
        vendorSalesByDate
    };
};
