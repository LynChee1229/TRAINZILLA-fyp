import React, {useEffect, useState} from 'react'
import {Box, Button, Card, CardContent, Paper, Stack} from '@mui/material'
import '../../../styles/css/homepage.sass'
import '../../../styles/Font/fonts.sass'
import {getRoutesDetails} from "../../../API/routeDetailsAPI";

const RightCard = ({depart, arrival, setShowTicketDetailsCallback}) => {

    const [routes, setRoutes] = useState({})

    useEffect(() => {
        if (depart !== '' && arrival !== '') {
            setShowTicketDetailsCallback(true)

            setRoutes(
                getRoutesDetails(
                    depart,
                    arrival,
                    Math.floor(Date.now() / 1000)
                ).routes
            )

        } else setShowTicketDetailsCallback(false)
    }, [depart, arrival, setShowTicketDetailsCallback])

    // let pathArr
    // routes.map((path) => {
    //     path.timeArrivalByStation.map((station) =>
    //         pathArr.push(station.stationName)
    //     )
    // })
    // console.log(pathArr.toString())

    console.log(routes)
    const routeDetail = (routePath) => (
        <Box className="default-font routeBox">
            <Paper className="center routeDetails">{routePath}</Paper>
            <Button
                variant="outlined"
                className="button default-font bold"
                sx={{color: '#004684', fontSize: '1vw'}}
            >
                View Route Details
            </Button>
        </Box>
    )

    return (
        <Card elevation={15} className="default-font rightCard">
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
