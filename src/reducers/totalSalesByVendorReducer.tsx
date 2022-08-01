import { Reducer } from "redux";
import { saveTotalSalesByVendorAction, saveVendorSalesByDateAction } from "../types/actionType";
import { totalSalesByVendor } from "../types/storeType";
import { reducerDateToSales } from "./vendorSalesByDateReducer";


const initialState: totalSalesByVendor = {
    V1: 0,
    V2: 0,
    V3: 0
};

const reducerTotalSales = (input: any) => {
    const vendorSalesByDate = reducerDateToSales(input);
    return {
        V1: vendorSalesByDate.V1.reduce((partialSum: number, a: number) => partialSum + a, 0),
        V2: vendorSalesByDate.V2.reduce((partialSum: number, a: number) => partialSum + a, 0),
        V3: vendorSalesByDate.V3.reduce((partialSum: number, a: number) => partialSum + a, 0),
    }
}

const totalSalesByVendorReducer: Reducer<totalSalesByVendor, saveVendorSalesByDateAction | saveTotalSalesByVendorAction> = (state = initialState,action) => {
    switch(action.type) {
        case 'SAVE_TOTAL_SALES_BY_VENDOR':
            return {...state, ...reducerTotalSales(action.vendorSalesByDate)};
        case 'SAVE_VENDOR_SALES_BY_DATE':
        default:
            return {...state};
    }
};

export default totalSalesByVendorReducer;