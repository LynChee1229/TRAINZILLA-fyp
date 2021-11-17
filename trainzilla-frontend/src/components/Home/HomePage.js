import React, {useEffect, useState} from 'react'
import '../../styles/css/homepage.sass'
import '../../styles/Font/fonts.sass'
import {Box, Collapse, Container, Stack} from '@mui/material'
import LeftCard from './LeftCard/LeftCard'
import RightCard from './RightCard/RightCard'
import Header from "../Header/Header";
import {getStationData} from '../../API/availableStationAPI'
import {getRoutesDetails} from '../../API/routeDetailsAPI'
import Footer from "../Footer/Footer";

const MyComponent = () => {
    const [departStation, setDepartStation] = useState('')
    const [arriveStation, setArriveStation] = useState('')
    const [ticketNum, setTicketNum] = useState(0)
    const [showTicketDetails, setShowTicketDetails] = useState(false)
    const [stations, setStations] = useState([])
    const [stationsList, setStationsList] = useState([])
    const [stationsList2, setStationsList2] = useState([])
    const [routes, setRoutes] = useState({})
    // const containerRef = React.useRef(null);

    useEffect(() => {
        setStations(getStationData())
        setStationsList(getStationData())
        setStationsList2(getStationData())
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
        // setStationsList(stations.filter(e => e !== depart))
        setStationsList2(stations.filter(e => e !== depart))
    }
    const arriveCallback = (arrive) => {
        setArriveStation(arrive)
        setStationsList(stations.filter(e => e !== arrive))
        // setStationsList2(stations.filter(e => e !== arrive))
    }
    const ticketNumCallback = (ticketNum) => {
        setTicketNum(ticketNum)
    }

    // const stationCallback = (name) => {
    //
    //
    // }

    return (
        <Stack spacing={3} className="bgBody bgImg">
            <Header/>
            <Container className="default-font blueFont" style={{fontSize:"1.6em"}}>
                <Box className="bold">CHOOSE YOUR DESTINATION</Box>
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
                        stations1={stationsList}
                        stations2={stationsList2}
                        // setStationList={stationCallback}
                    />
                </Box>

                <Box>
                    <Collapse orientation="horizontal" in={showTicketDetails}>
                        <RightCard routes={routes}/>
                    </Collapse>
                </Box>
            </Container>
            <Footer/>
        </Stack>
    )
}

export default MyComponent
