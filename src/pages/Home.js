import { Box, Card, Center, Heading, Image, Stack, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import WeatherComponent from '../components/WeatherComponent'
import { useAppContext } from '../context/appContext'
import WeatherForecast from '../components/WeatherForecast'
import logo from '../assets/images/logo.png'
function Home() {

    const { cityName, errorMsg } = useAppContext();

    return (
        <Center
            flexDirection='column'
            minH='100vh'

        >
            <Stack
                direction='column'
                spacing={5}
                w='full'
                px={10}
                py={5}
                maxW='1000px'
                alignSelf='center'
            >

                <Stack spacing={0}>
                    <Stack direction='row' align='center' justifyContent='center'>
                        <Image src={logo} w='calc(3.5rem + 1.5vw)' />
                        <Heading
                            color='brand_primary.500'
                            fontSize='calc(1rem + 1.5vw)'
                        >
                            Weather Wizard
                        </Heading>
                    </Stack>

                    <SearchBar />
                </Stack>

                {errorMsg !== null &&

                    <Card Card
                        py={'25px'}
                        px={{ base: 5, lg: 10 }}
                        borderRadius='15px'
                        bg='red.400'
                    >

                        <Text color='white' fontWeight='bold'>{errorMsg}</Text>

                    </Card>

                }

                {cityName !== '' && <WeatherComponent />}

                {cityName !== '' && <WeatherForecast />}


            </Stack>


        </Center >
    )
}

export default Home