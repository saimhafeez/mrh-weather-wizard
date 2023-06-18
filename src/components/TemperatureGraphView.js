import React, { useEffect, useState } from 'react'
import { Box, Card, Center, CircularProgress, Stack } from '@chakra-ui/react';
import { useAppContext } from '../context/appContext';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


function TemperatureGraphView() {

    const { getWeatherForecastbyname, cityName, isCelsius, getInFer, getInCelsius } = useAppContext()

    const [forecast, setForecast] = useState({
        isLoading: true,
        result: null
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

            const forecastData = [];

            for (const item of result.list) {
                forecastData.push({
                    dt: new Date(item.dt * 1000).toLocaleDateString(),
                    temp: isCelsius ? Number.parseInt(getInCelsius(item.main.temp)) : Number.parseInt(getInFer(item.main.temp)),
                    humidity: item.main.humidity,
                    wind: item.wind.speed,
                })
            }

            console.log(forecastData);

            setForecast(prev => ({
                ...prev,
                isLoading: false,
                result: forecastData
            }))
            console.log(result);
        }).catch((error) => {
            console.log(error);
        })

    }, [cityName, isCelsius])

    return (

        <Box w='full'>

            {forecast.result && !forecast.isLoading ?

                <Card
                    // py={{ base: '50px', lg: '50px' }}
                    // px={{ base: 5, lg: 10 }}
                    borderRadius='7px'
                    mt={{ base: 2, lg: 10 }}
                // direction={{ base: 'column', lg: 'row' }}
                // bg='gray.900'
                >
                    <Stack w='100%' h={{ base: '150px', lg: '300px' }} p={{ base: 0, lg: 2 }} >
                        <ResponsiveContainer width="100%" height="100%">
                            {/* <AreaChart
                                width={500}
                                height={400}
                                data={forecast.result}
                                margin={{
                                    top: 10,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="dt" />
                                <YAxis />
                                <Tooltip />
                                <Area type="monotone" dataKey="temp" stroke="#8884d8" fill="#8884d8" />
                            </AreaChart> */}
                            {/* <LineChart width={300} height={100} data={forecast.result}>
                                <Line type="monotone" dataKey="temp" stroke="#8884d8" strokeWidth={2} />
                            </LineChart> */}

                            <AreaChart
                                width={500}
                                height={400}
                                data={forecast.result}
                                margin={{
                                    top: 10,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="dt" />
                                <YAxis />
                                <Tooltip />
                                <Area type="monotone" dataKey="temp" stackId="1" stroke="#8884d8" fill="#8884d8" />
                                <Area type="monotone" dataKey="humidity" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                                <Area type="monotone" dataKey="wind" stackId="1" stroke="#ffc658" fill="#ffc658" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </Stack>

                </Card>

                :
                <Center py={10}>
                    <CircularProgress isIndeterminate color='brand_primary.500' />
                </Center>
            }
        </Box>
    )
}

export default TemperatureGraphView