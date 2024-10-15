import Cookies from 'js-cookie';
import actionTypes from './actionTypes'
import { apiConfirmEmail, apiLogin, apiLogout, apiRegister } from '~/services/authService'


export const register = (payload) => async (dispatch) => {
    dispatch({
        type: actionTypes.LOADING,
        payload: {
            loading: true,
            message: "Loading...",
            data: [],
        }
    })

    try {
        let response = await apiRegister(payload)
        if (response.data?.isSuccess) {
            dispatch({
                type: actionTypes.REGISTER,
                payload: {
                    token: null,
                    message: response.data.message,
                    isSuccess: response.data.isSuccess,
                    loading: false
                }
            })
        } else {
            response = response.response
            dispatch({
                type: actionTypes.REGISTER,
                payload: {
                    isSuccess: false,
                    message: response?.data?.message || Object.values(response?.data?.errors)[0],
                    token: null,
                    loading: false
                }
            })
        }
    } catch (e) {
        dispatch({
            type: actionTypes.REGISTER,
            payload: {
                isSuccess: false,
                message: e.message,
                token: null,
                loading: false
            }
        })
    }


}

export const confirmEmail = (payload) => async (dispatch) => {
    dispatch({
        type: actionTypes.LOADING,
        payload: {
            loading: true,
            message: "Loading...",
            data: [],
        }
    })
    try {
        let response = await apiConfirmEmail(payload)
        if (response.data?.isSuccess) {
            dispatch({
                type: actionTypes.CONFIRM_EMAIL,
                payload: {
                    token: null,
                    message: response.data.message,
                    isSuccess: response.data.isSuccess,
                    isConfirm: true,
                    loading: false
                }
            })
        } else {

            response = response.response
            dispatch({
                type: actionTypes.CONFIRM_EMAIL,
                payload: {
                    isSuccess: false,
                    message: response?.data?.message || Object.values(response?.data?.errors)[0],
                    token: null,
                    isConfirm: false,
                    loading: false

                }
            })
        }
    } catch (e) {
        dispatch({
            type: actionTypes.CONFIRM_EMAIL,
            payload: {
                isSuccess: false,
                message: e.message,
                token: null,
                isConfirm: false,
                loading: false

            }
        })
    }
}

export const login = (payload) => async (dispatch) => {
    dispatch({
        type: actionTypes.LOADING,
        payload: {
            loading: true,
            message: "Loading...",
        }
    })
    
    try {
        let response = await apiLogin(payload)

        if (response.data?.isSuccess) {

            // Cookies.remove(process.env.REACT_APP_COOKIES, { path: '/' });
            // Cookies.remove(process.env.REACT_APP_LOGINED, { path: '/' });
            // localStorage.removeItem(process.env.REACT_APP_IDSHOP)

            Cookies.set(process.env.REACT_APP_COOKIES, response.data.data.accessToken, {
                path: '/',
                expires: new Date(Date.now() + 3600000 * 60), // 1 hour
            })
            Cookies.set(process.env.REACT_APP_LOGINED, response.data?.isSuccess, {
                path: '/',
                expires: new Date(Date.now() + 3600000 * 60), // 1 hour
            })

            dispatch({
                type: actionTypes.LOGIN,
                payload: {
                    token: response.data.data.accessToken,
                    message: response.data.message,
                    isLogined: true,
                    loading: false
                }
            })
        } else {
            response = response.response
            dispatch({
                type: actionTypes.LOGIN,
                payload: {
                    isLogined: false,
                    message: response?.data?.message || Object.values(response?.data?.errors)[0],
                    token: null,
                    loading: false
                }
            })
        }
    }
    catch (e) {
        dispatch({
            type: actionTypes.LOGIN,
            payload: {
                isLogined: false,
                message: e.message,
                loading: false
            }
        })
    }
}


export const logout = () => async (dispatch) => {
    try {
        const res = await apiLogout()
        
        if (res) {
            Cookies.remove(process.env.REACT_APP_COOKIES, { path: '/' });
            Cookies.remove(process.env.REACT_APP_LOGINED, { path: '/' });
            localStorage.removeItem(process.env.REACT_APP_IDSHOP)
            dispatch({
                type: actionTypes.LOGOUT,
                payload: {
                    isLogined: false,
                    message: "Logged Out Successfully",
                    loading: false
                }
            })
        }
    } catch (e) {
        console.log(e);
    }


}

