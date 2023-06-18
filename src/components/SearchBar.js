import { Box, Button, Card, Input, Stack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'

import { MdGpsFixed } from 'react-icons/md'
import { useAppContext } from '../context/appContext';

import { City } from 'country-state-city';



function SearchBar() {

    const [searchName, setSearchName] = useState('');
    const { updateCityName, updateErrorMsg, errorMsg, setCityNameByCoordinates } = useAppContext();

    const [isInputFocused, setIsInputFocused] = useState(false);

    const searchHandler = () => {
        updateCityName(searchName);
        setIsInputFocused(false)
    }

    const nav = () => {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(function (position) {
                setCityNameByCoordinates(position.coords.latitude, position.coords.longitude)
            }, function (error) {
                // console.log('error: ', error.message);
                updateErrorMsg(error.message)
            });
        } else {
            updateErrorMsg('Browser does not support GeoLocation');
        }
    }



    return (
        <Stack>
            <Stack
                direction='row'
                align='center'
                bg='white'
                borderRadius='15px'
            >
                <Stack w='full' position='relative'>
                    <Input
                        type='text'
                        placeholder='Enter City'
                        variant='unstyled'
                        p={2}
                        border='none'
                        value={searchName}
                        onChange={
                            (e) => {
                                errorMsg !== null && updateErrorMsg(null)
                                setSearchName(e.target.value)
                                if (e.target.value !== '') {
                                    setIsInputFocused(true)
                                }
                            }
                        }
                    />
                </Stack>
                <MdGpsFixed color='var(--chakra-colors-brand_secondary-500)' size={'32px'} cursor='pointer' onClick={nav} />
                <Button
                    borderRadius='15px'
                    colorScheme='brand_secondary'
                    onClick={searchHandler}
                >Search</Button>
            </Stack >

            <Card
                w='full'
                direction='column'
                display={isInputFocused ? 'block' : 'none'}
                p={2}
            >
                <Stack>
                    {City.getAllCities().filter(city => city.name.toLocaleLowerCase().match(searchName.toLocaleLowerCase())).splice(0, 4).map((city, index) => {
                        return <Box
                            key={index}
                            onClick={() => {
                                setSearchName(city.name)
                                updateCityName(city.name);
                                setIsInputFocused(false)
                            }}
                            borderRadius='10px'
                            bg='gray.200'
                            p={2}
                            textAlign='center'
                            cursor='pointer'
                        >
                            <Text>
                                {`${city.name} [${city.countryCode}]`}
                            </Text>
                        </Box>
                    })}

                    {City.getAllCities().filter(city => city.name.toLocaleLowerCase().match(searchName.toLocaleLowerCase())).length === 0 && <Text>No Cities Found</Text>}
                </Stack>
            </Card>
        </Stack>
    )
}

export default SearchBar