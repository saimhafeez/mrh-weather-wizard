import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/appContext'
import { Box, Card, Center, CircularProgress, Wrap } from '@chakra-ui/react';
import SingleWeatherForecast from './SingleWeatherForecast';
import TemperatureGraphView from './TemperatureGraphView';


function WeatherForecast() {

    const { getWeatherForecastbyname, cityName, errorMsg } = useAppContext()

    const [forecast, setForecast] = useState({
        isLoading: true
    })

    useEffect(() => {

        setForecast(prev => ({
            ...prev,
            isLoading: true
        }))


        new Promise(async (resolve, reject) => {
            try {
                const result = await getWeatherForecastbyname(cityName);
                resolve(result)
            } catch (error) {
                reject(error)
            }
        }).then((result) => {
            setForecast(prev => ({
                ...prev,
                isLoading: false,
                result
            }))
            console.log(result);
        }).catch((error) => {
            console.log(error);
        })

    }, [cityName])

    return (
        <Box>

            {forecast.result && !forecast.isLoading &&

                <Card
                    py={{ base: '50px', lg: '50px' }}
                    px={{ base: 5, lg: 10 }}
                    borderRadius='15px'
                    // direction={{ base: 'column', lg: 'row' }}
                    bg='gray.900'
                >

                    <Wrap
                        w='full'
                    // direction='row'
                    // mr={{ base: 0, lg: '50px' }}
                    // mb={{ base: 10, lg: 0 }}
                    >
                        {forecast.result.list.filter(function (value, index, Arr) {
                            return index % 8 == 0;
                        }).splice(0, 4).map((item, index) => {
                            return <SingleWeatherForecast key={index} item={item} />
                        })}

                    </Wrap>

                    <TemperatureGraphView />

                </Card>

            }
            {
                errorMsg !== null && forecast.isLoading &&
                <Center py={10}>
                    <CircularProgress isIndeterminate color='brand_primary.500' />
                </Center>
            }
        </Box>
    )
}

export default WeatherForecast