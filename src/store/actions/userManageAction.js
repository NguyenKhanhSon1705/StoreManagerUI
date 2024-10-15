import { apiGetUserDetails, apiGetUserOfTree, apiGetUserOfTreeById, apiLookUser, apiUpdateUser } from "~/services/userManageService"
import actionTypes from "./actionTypes"

export const getUserOfTree = () => async (dispatch) =>{
    dispatch({
        type: actionTypes.LOADING,
        payload: {
            loading: true,
            message: "Loading...",
            data: [],
        }
    })
    try{
        const response = await apiGetUserOfTree()
        if(response.data?.isSuccess){
            dispatch({
                type: actionTypes.GET_USER_OF_TREE,
                payload: {
                    message: response.data.message,
                    isSuccess: response.data.isSuccess,
                    loading: false,
                    data: response.data.data,
                }
            })
        }else{
            dispatch({
                type: actionTypes.GET_USER_OF_TREE,
                payload: {
                    message: response.data.message,
                    isSuccess: false,
                    loading: false,
                    data: {},
                }
            })
        }
    }
    catch(e){
        dispatch({
            type: actionTypes.GET_USER_OF_TREE,
            payload: {
                message: e.message,
                isSuccess: false,
                loading: false,
                data: {},
            }
        })
    }

} 

export const getUserOfTreeById = (idUser) => async (dispatch)=>{
    try{
        let response = await apiGetUserOfTreeById(idUser)
        if(response.data?.isSuccess){
            dispatch({
                type: actionTypes.GET_USER_OF_TREE_BY_ID,
                payload: {
                    message: response.data.message,
                    isSuccess: response.data.isSuccess,
                    loading: false,
                    data: response.data.data,
                    update: false,
                    parentId: idUser
                }
            })
        }else{
            response = response.response

            dispatch({
                type: actionTypes.GET_USER_OF_TREE_BY_ID,
                payload: {
                    message: response.data?.message,
                    isSuccess: false,
                    loading: false,
                    data: {},
                }
            })
        }

    }catch(e){
        dispatch({
            type: actionTypes.GET_USER_OF_TREE_BY_ID,
            payload: {
                message: e.message,
                isSuccess: false,
                loading: false,
                data: {},
            }
        })
    }
}

export const getUserDetails = (userId) => async (dispatch) =>{
    
    try{
        let response = await apiGetUserDetails(userId)
        if(response.data?.isSuccess){
            dispatch({
                type: actionTypes.GET_USER_DETAILS,
                payload: {
                    message: response.data.message,
                    isSuccess: response.data.isSuccess,
                    loading: false,
                    data: response.data.data,
                }
            })
        }else{
            response = response.response

            dispatch({
                type: actionTypes.GET_USER_DETAILS,
                payload: {
                    message: response.data.message,
                    isSuccess: false,
                    loading: false,
                    data: {},
                }
            })
        }
    }catch (e){
        dispatch({
            type: actionTypes.GET_USER_DETAILS,
            payload: {
                message: e.message,
                isSuccess: false,
                loading: false,
                data: {},
            }
        })
    }
}
export const updateUser = (payload) => async (dispatch) => {
    try {
        let response = await apiUpdateUser(payload);
        if (response.data?.isSuccess) {
            dispatch({
                type: actionTypes.UPDATE_USER,
                payload: {
                    message: response.data.message,
                    loading: false,
                    data: response.data.data,
                }
            });
        } else {
            response = response.response
            dispatch({
                type: actionTypes.UPDATE_USER,
                payload: {
                    message: response.data.message,
                    isSuccess: false,
                    loading: false
                }
            });
        }
    }catch(e) {
        dispatch({
            type: actionTypes.UPDATE_USER,
            payload: {
                message: e.message,
                loading: false,
            }
        });
    }
}

export const lockUser = (payload) => async (dispatch) => {
    try {
        let response = await apiLookUser(payload);
        
        if (response.data?.isSuccess) {
            dispatch({
                type: actionTypes.LOOK_USER,
                payload: {
                    message: response.data.message,
                    loading: false,
                    data: response.data.data,
                }
            });
        } else {
            response = response.response
            dispatch({
                type: actionTypes.LOOK_USER,
                payload: {
                    message: response.data.message,
                    isSuccess: false,
                    loading: false
                }
            });
        }
    }catch(e) {
        dispatch({
            type: actionTypes.LOOK_USER,
            payload: {
                message: e.message,
                loading: false,
            }
        });
    }
}