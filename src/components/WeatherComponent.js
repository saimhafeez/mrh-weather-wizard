import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/appContext'
import { Badge, Box, Card, Center, CircularProgress, Heading, Image, Skeleton, Stack, Switch, Text } from '@chakra-ui/react';
import ReactCountryFlag from 'react-country-flag';

import humidityIcon from '../assets/images/humidity.png'
import pressureIcon from '../assets/images/pressure.png'
import temperatureIcon from '../assets/images/temperature.png'
import windIcon from '../assets/images/wind.png'
import WeatherMain from './WeatherMain';
import WeatherStatusList from '../utils/WeatherStatusList';

function WeatherComponent() {

    const { cityName, getWeatherbyname, isCelsius, updateIsCelsius, getInFer, getInCelsius, updateCityName, errorMsg } = useAppContext();

    const [weatherInfo, setWeatherInfo] = useState({
        isLoading: true,
        result: null
    })

    useEffect(() => {
        setWeatherInfo(prev => ({
            ...prev,
            isLoading: true,
        }))
        new Promise(async (resolve, reject) => {
            try {
                const result = await getWeatherbyname(cityName);
                resolve(result)
            } catch (error) {
                reject(error)
            }
        }).then((result) => {
            setWeatherInfo(prev => ({
                ...prev,
                isLoading: false,
                result
            }))
            // console.log(result);
        }).catch((error) => {
            console.log(error);
        })
    }, [cityName])

    return (
        <Box>

            {weatherInfo.result && !weatherInfo.isLoading &&

                <Card
                    py={{ base: '50px', lg: '50px' }}
                    px={{ base: 5, lg: 10 }}
                    borderRadius='15px'
                    direction={{ base: 'column', lg: 'row' }}
                >

                    <Stack
                        direction='column'
                        mr={{ base: 0, lg: '50px' }}
                        mb={{ base: 10, lg: 0 }}
                    >
                        <Stack
                            direction='row'
                            fontWeight='bold'
                            color='brand_primary.500'
                            fontSize='calc(1rem + 0.5vw)'
                            align='center'
                        >
                            <Text>°C</Text>
                            <Switch value={isCelsius} isChecked={!isCelsius} colorScheme='brand_primary' onChange={() => updateIsCelsius(!isCelsius)} size='lg' />
                            <Text>°F</Text>
                        </Stack>
                        <Text
                            color='gray.400'
                            fontWeight='bold'
                            fontSize='calc(1rem + 0.5vw)'
                        >
                            {weatherInfo.result.name}
                        </Text>

                        <Stack
                            direction='row'
                            align='center'
                        >
                            <Image w='calc(5rem + 0.5vw)' src={WeatherStatusList[weatherInfo.result.weather[0].main]} />
                            <Stack
                                direction='column'
                            >
                                <Heading
                                    fontSize='calc(2.5rem + 0.5vw)'
                                >
                                    {isCelsius ?
                                        getInCelsius(weatherInfo.result.main.temp)
                                        : getInFer(weatherInfo.result.main.temp)
                                    }
                                </Heading>
                                <Heading
                                    fontSize='calc(1rem + 0.5vw)'
                                    textTransform='capitalize'
                                >
                                    {weatherInfo.result.weather[0].description}
                                </Heading>
                            </Stack>
                        </Stack>

                        <Stack
                            direction='row'
                            align='center'
                        >
                            <Text
                                color='gray.400'
                                fontWeight='bold'
                                fontSize='calc(1rem + 0.5vw)'
                            >
                                Last Updated:
                            </Text>

                            <Badge
                                w='fit-content'
                                fontWeight='bold'
                                fontSize='calc(1rem + 0.5vw)'
                            >
                                {new Date(weatherInfo.result.dt * 1000).toLocaleTimeString()}
                            </Badge>
                        </Stack>
                    </Stack>

                    <Stack>
                        <WeatherMain
                            icon={temperatureIcon}
                            name={"Feels Like"}
                            value={isCelsius ?
                                getInCelsius(weatherInfo.result.main.feels_like)
                                : getInFer(weatherInfo.result.main.feels_like)
                            }
                        />
                        <WeatherMain
                            icon={pressureIcon}
                            name={"Pressure"}
                            value={weatherInfo.result.main.pressure + " hPa"}
                        />
                        <WeatherMain
                            icon={humidityIcon}
                            name={"Humidity"}
                            value={weatherInfo.result.main.humidity + " %"}
                        />
                        <WeatherMain
                            icon={windIcon}
                            name={"Wind"}
                            value={weatherInfo.result.wind.speed + " m/s"}
                        />
                    </Stack>

                </Card>

            }
            {
                errorMsg !== null && weatherInfo.isLoading &&
                <Center py={10}>
                    <CircularProgress isIndeterminate color='brand_primary.500' />
                </Center>
            }
        </Box>
    )
}

export default WeatherComponent