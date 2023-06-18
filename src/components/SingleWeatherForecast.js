import React from 'react'
import { Card, Heading, Image, Stack, Text } from '@chakra-ui/react';
import WeatherStatusList from '../utils/WeatherStatusList';
import WeatherMain from './WeatherMain';

import humidityIcon from '../assets/images/humidity.png'
import windIcon from '../assets/images/wind.png'
import { useAppContext } from '../context/appContext';

function SingleWeatherForecast({ item }) {

    const { isCelsius, getInFer, getInCelsius } = useAppContext()

    return (
        <Card
            w={{ base: '100%', lg: '49.52%' }}
            p={3}
        >

            <Text fontWeight='bold' color='brand_primary.300' textAlign='center'>
                {new Date(item.dt * 1000).toDateString()}
            </Text>

            <Stack direction={{ base: 'column', lg: 'row' }} justifyContent='space-between' px={'10px'}>

                <Stack direction='column' justifyContent='center' align='center'>
                    <Image w='calc(5rem + 0.5vw)' src={WeatherStatusList[item.weather[0].main]} />
                    <Text textTransform='capitalize' fontWeight='bold' color='gray.400'>
                        {item.weather[0].description}
                    </Text>
                </Stack>

                <Stack direction='column' justifyContent='center' align='center'>
                    <Heading
                        fontSize='calc(1.5rem + 0.5vw)'
                    >
                        {isCelsius ?
                            getInCelsius(item.main.temp)
                            : getInFer(item.main.temp)
                        }
                    </Heading>

                    <WeatherMain
                        icon={humidityIcon}
                        name={"Humidity"}
                        value={item.main.humidity + "%"}
                        imageSize='calc(1rem + 0.5vw)'
                        fontSize='calc(1rem + 0.25vw)'
                    />

                    <WeatherMain
                        icon={windIcon}
                        name={"Wind"}
                        value={item.wind.speed + "m/s"}
                        imageSize='calc(1rem + 0.5vw)'
                        fontSize='calc(1rem + 0.25vw)'
                    />
                </Stack>

            </Stack>

        </Card>
    )
}

export default SingleWeatherForecast