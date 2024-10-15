import actionTypes from "../actions/actionTypes"

const initState = {
    data: [],
    message: '',
    update: false,
    loading: false
}
export default function tablesReducer(state = initState, action) {
    switch (action.type) {
        case actionTypes.GET_LIST_TABLES: {
            return {
                data: action.payload.data,
                loading: false,
                update: false
            }
        }
        case actionTypes.CREATE_AREA:
            return {
                ...state,
                data: [...state.data, action.payload.data],
                message: action.payload.message,
                loading: false,
                update: true
            }
        case actionTypes.UPDATE_TABLES:
            return {
                ...state,
                data: state.data.map(table => table.id === action.payload.id ? action.payload : table),
                message: action.payload.message,
                loading: false,
                update: true
                // data: state.data.map(table => table.id === action.payload.id? action.payload: table)
            }
        case actionTypes.DELETE_TABLES:
            return {
                ...state,
                data: state.data.filter(table => table.id !== action.payload),
                message: action.payload.message,
                loading: false,
                update: false
            }
        case actionTypes.ERROR: {
            return {
                ...state,
                message: action.payload.message,
                loading: false
            }
        }
        case actionTypes.LOADING:{
            return {
                loading: action.payload.loading
            }
        }
        default:
            return state
    }
}