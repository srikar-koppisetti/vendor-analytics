import { combineReducers } from "redux";
import totalSalesByVendor from "./totalSalesByVendorReducer";
import vendorSalesByDate from "./vendorSalesByDateReducer";

export default combineReducers({
    vendorSalesByDate,
    totalSalesByVendor
});