import React, { useContext, useReducer } from "react"

import reducer from './reducer'
import axios from "axios";
import { CHANGE_CITY_NAME, CHANGE_ERROR_MSG, CHANGE_IS_CELSIUS } from "./actions";


const AppContext = React.createContext();

const initialState = {
    cityName: '',
    cityCoordinates: '',
    isCelsius: true,
    errorMsg: null
}

const AppProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);



    const updateCityName = (name) => {
        dispatch({
            type: CHANGE_CITY_NAME,
            payload: {
                cityName: name
            }
        })
    }

    const updateErrorMsg = (errorMsg) => {
        dispatch({
            type: CHANGE_ERROR_MSG,
            payload: {
                errorMsg
            }
        })
    }

    const updateIsCelsius = (isCelsius) => {
        dispatch({
            type: CHANGE_IS_CELSIUS,
            payload: {
                isCelsius
            }
        })
    }

    const setCityNameByCoordinates = (lat, lon) => {

        new Promise(async (resolve, reject) => {
            try {
                const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?appid=28c532e14680d29c27e1833e7f07b221&lat=${lat}&lon=${lon}`);
                const result = await data;
                resolve(result)

                return result
            } catch (error) {
                reject(error)
            }
        }).then((result) => {
            updateCityName(result.name)
        }).catch((error) => {
            updateErrorMsg(error.response.data.message || error.message)
        })
    }


    const getWeatherbyname = async (name) => {
        try {

            const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=28c532e14680d29c27e1833e7f07b221`);

            const result = await data;

            updateErrorMsg(null)

            return result

        } catch (error) {
            console.log('error -> ', error);
            updateErrorMsg(error.response.data.message || error.message)
        }
    }

    const getWeatherForecastbyname = async (name) => {
        try {

            const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?appid=28c532e14680d29c27e1833e7f07b221&q=${name}`);

            const result = await data;

            return result

        } catch (error) {
            console.log('error -> ', error);
        }
    }

    const getInFer = (kelvin) => {

        return Math.floor((kelvin - 273.15) * (9 / 5) + 32) + " °F"
    }

    const getInCelsius = (kelvin) => {
        return Math.floor(kelvin - 273.15) + " °C"
    }


    return <AppContext.Provider value={{
        ...state,
        updateCityName,
        updateErrorMsg,
        getWeatherbyname,
        getWeatherForecastbyname,
        updateIsCelsius,
        getInFer,
        getInCelsius,
        setCityNameByCoordinates
    }}>
        {children}
    </AppContext.Provider>
}

const useAppContext = () => {
    return useContext(AppContext)
}

export { AppProvider, useAppContext }