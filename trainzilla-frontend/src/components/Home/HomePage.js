import React, { useEffect, useState } from 'react'
import '../../styles/css/homepage.sass'
import '../../styles/Font/fonts.sass'
import { Box, Collapse, Container, Stack } from '@mui/material'
import LeftCard from './LeftCard/LeftCard'
import RightCard from './RightCard/RightCard'
import Header from "../Header/Header";
import { getStationData } from '../../API/availableStationAPI'
import { getRoutesDetails } from '../../API/routeDetailsAPI'
import Footer from "../Footer/Footer";

const MyComponent = () => {
    const [departStation, setDepartStation] = useState('')
    const [arriveStation, setArriveStation] = useState('')
    const [ticketNum, setTicketNum] = useState(0)
    const [showTicketDetails, setShowTicketDetails] = useState(false)
    const [stations, setStation] = useState([])
    const [routes, setRoutes] = useState({})
    // const containerRef = React.useRef(null);

    useEffect(() => {
        setStation(getStationData())
    }, [])

    useEffect(() => {
        if (departStation !== '' && arriveStation !== '') {
            setShowTicketDetails(true)

            setRoutes(
                getRoutesDetails(
                    departStation,
                    arriveStation,
                    Math.floor(Date.now() / 1000)
                ).routes
            )
        } else setShowTicketDetails(false)
    }, [departStation, arriveStation])

    const departCallback = (depart) => {
        setDepartStation(depart)
    }
    const arriveCallback = (arrive) => {
        setArriveStation(arrive)
    }
    const ticketNumCallback = (ticketNum) => {
        setTicketNum(ticketNum)
    }

    return (
        <Stack spacing={3} className="bgBody bgImg">
            <Header />
            <Container  className="default-font blueFont">
                <Box className="bold box title">CHOOSE YOUR DESTINATION</Box>
            </Container>

            <Container className="flex" maxWidth="xl">
                <Box className="center">
                    <LeftCard
                        departStation={departStation}
                        setDepartStation={departCallback}
                        arriveStation={arriveStation}
                        setArriveStation={arriveCallback}
                        showTicketDetails={showTicketDetails}
                        ticketNum={ticketNum}
                        setTicketNum={ticketNumCallback}
                        stations={stations}
                    />
                </Box>

                <Box>
                    <Collapse orientation="horizontal" in={showTicketDetails}>
                        <RightCard routes={routes} />
                    </Collapse>
                </Box>
            </Container>
            <Footer />
        </Stack>
    )
}

export default MyComponent
