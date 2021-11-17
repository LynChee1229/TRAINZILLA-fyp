import React from 'react'
import { Box, Button, Card, CardContent, Paper, Stack } from '@mui/material'
import '../../../styles/css/homepage.sass'
import '../../../styles/Font/fonts.sass'

const RightCard = ({ routes }) => {
    // let pathArr
    // routes.map((path) => {
    //     path.timeArrivalByStation.map((station) =>
    //         pathArr.push(station.stationName)
    //     )
    // })
    // console.log(pathArr.toString())
    const routeDetail = (routePath) => (
        <Box className="default-font routeBox">
            <Card className="center routeDetails">{routePath}</Card>
            <Button
                variant="outlined"
                className="button default-font bold"
                sx={{ color: '#004684' }}
            >
                View Route Details
            </Button>
        </Box>
    )

    return (
        <Card elevation={15} className="rightCard">
            <CardContent>
                <Stack>{routeDetail('llalal')}</Stack>
                <Stack>{routeDetail('huhu')}</Stack>
                <Stack>{routeDetail('gaagag')}</Stack>
                <Stack>{routeDetail('yeye')}</Stack>
            </CardContent>
        </Card>
    )
}

export default RightCard
