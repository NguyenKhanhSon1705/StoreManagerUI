import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import currentUserReducer from "./reducers/currentUserReducer";
import userManage from "./reducers/userManageReducer";
import shopReducer from "./reducers/shopReducer";
import areasReducer from "./reducers/areasReducer";
import tablesReducer from "./reducers/tablesReducer";


const rootReducer = combineReducers({
    auth: authReducer,
    currentUser: currentUserReducer,
    userManage: userManage,
    shop: shopReducer,
    area: areasReducer,
    table: tablesReducer
  });

export default rootReducer