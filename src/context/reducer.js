import { CHANGE_CITY_NAME, CHANGE_ERROR_MSG, CHANGE_IS_CELSIUS } from "./actions";

const reducer = (state, action) => {
    if (action.type === CHANGE_CITY_NAME) {
        return {
            ...state,
            cityName: action.payload.cityName
        }
    }

    if (action.type === CHANGE_IS_CELSIUS) {
        return {
            ...state,
            isCelsius: action.payload.isCelsius
        }
    }

    if (action.type === CHANGE_ERROR_MSG) {
        return {
            ...state,
            errorMsg: action.payload.errorMsg
        }
    }

    throw new Error(`no such acrtion: ${action.type}`)
}

export default reducer;