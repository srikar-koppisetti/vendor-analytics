import { Reducer } from "redux";
import { saveTotalSalesByVendorAction, saveVendorSalesByDateAction } from "../types/actionType";
import { vendorSalesByDate } from "../types/storeType";

const initialState: vendorSalesByDate = {
    dates: [],
    V1: [],
    V2: [],
    V3: []
};

export const reducerDateToSales = (input: any) => {
    const startDate: number = 44562;
    let dateToSalesByVendor: any = {
        dates: [],
        V1: [],
        V2: [],
        V3: []
    }
    for(let i=0;i<input.length; i++) {
        let salesArr: number[] = [];
        for(let j=1;j<input[i].length;j++) {
            const sale = input[i][j];
            const vendor = sale.__EMPTY_2;
            const index = sale.__EMPTY_4 % startDate;
            const saleCount = sale.__EMPTY_3;
            if(dateToSalesByVendor[vendor][index] > 0) {
                dateToSalesByVendor[vendor][index] +=  saleCount;
            } else {
                dateToSalesByVendor[vendor][index] =  saleCount;
            }
        } 
    }
    for(let i=1; i<=31; i++) {
        dateToSalesByVendor.dates.push(`1/${i}/2022`);
    }
    return dateToSalesByVendor;
}

const vendorSalesByDateReducer: Reducer<vendorSalesByDate, saveVendorSalesByDateAction | saveTotalSalesByVendorAction> = (state = initialState,action) => {
    switch(action.type) {
        case 'SAVE_VENDOR_SALES_BY_DATE':
            const updateState = {...state, ...reducerDateToSales(action.vendorSales)};
            return updateState;
        case 'SAVE_TOTAL_SALES_BY_VENDOR':
        default:
            return {...state};
    }
};

export default vendorSalesByDateReducer;