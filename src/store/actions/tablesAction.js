import { apiCreateTable, apiGetListTables } from "~/services/tablesService";
import actionTypes from "./actionTypes";

export const createTables = (payload) => async (dispatch) =>{
    try{
        let response = await apiCreateTable(payload);
        if(response.data?.isSuccess){
            dispatch({
                type: actionTypes.CREATE_TABLES,
                payload: {
                    message: response.data.message,
                    data: response.data.data,
                    loading: false,
                    update: true,
                }
            })
        }else{
            response = response.response
            dispatch({
                type: actionTypes.ERROR,
                payload: {
                    message: response?.data?.message || Object.values(response?.data?.errors)[0],
                    loading: false,
                    update: false
                }
            })
        }
    }catch(e){
        dispatch({
            type: actionTypes.ERROR,
            payload: {
                message: e.message,
                loading: false,
                update: false
            }
        })
    }
}

export const getListTables = () => async (dispatch) =>{
    dispatch({
        type: actionTypes.LOADING,
        payload: {
            loading: true,
        }
    })
    try{
        let response = await apiGetListTables();
        if(response.data?.isSuccess){
            dispatch({
                type: actionTypes.GET_LIST_TABLES,
                payload: {
                    message: response.data.message,
                    data: response.data.data,
                    loading: false,
                    update: false,
                }
            })
        }else{
            response = response.response
            dispatch({
                type: actionTypes.ERROR,
                payload: {
                    message: response?.data?.message || Object.values(response?.data?.errors)[0],
                    loading: false,
                    update: false
                }
            })
        }
    }
    catch(e){
        dispatch({
            type: actionTypes.ERROR,
            payload: {
                message: e.message,
                loading: false,
                update: false
            }
        })
    }
}