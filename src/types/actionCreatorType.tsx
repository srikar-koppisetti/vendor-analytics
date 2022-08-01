import { saveTotalSalesByVendorAction, saveVendorSalesByDateAction } from "./actionType";


export type saveVendorSalesByDateActionCretor = (vendorSales: any) => saveVendorSalesByDateAction;
export type saveTotalSalesByVendorActionCretor = (vendorSalesByDate: any) => saveTotalSalesByVendorAction;