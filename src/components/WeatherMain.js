import { Box, Divider, Image, Stack, Text } from '@chakra-ui/react'
import React from 'react'

function WeatherMain({ icon, name, value, imageSize = 'calc(1rem + 1vw)', fontSize = 'calc(1rem + 0.5vw)' }) {
    return (
        <Box>
            <Stack direction='row'
                justifyContent='space-between'
                align='center'
                mb={2}
            >

                <Stack
                    direction='row'
                    align='center'
                >
                    <Image w={imageSize} src={icon} />
                    <Text pr={10} fontSize={fontSize}>{name}</Text>
                </Stack>

                <Text fontSize={fontSize}>{value}</Text>
            </Stack>
            <Divider />
        </Box>
    )
}

export default WeatherMain