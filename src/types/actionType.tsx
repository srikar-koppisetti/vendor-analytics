export interface saveVendorSalesByDateAction {
    type: 'SAVE_VENDOR_SALES_BY_DATE';
    vendorSales: any;
}

export interface saveTotalSalesByVendorAction {
    type: 'SAVE_TOTAL_SALES_BY_VENDOR';
    vendorSalesByDate: any;
}