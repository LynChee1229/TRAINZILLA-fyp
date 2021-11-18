import React, {useEffect, useState} from 'react'
import '../../styles/css/homepage.sass'
import '../../styles/Font/fonts.sass'
import {Box, Collapse, Container, Stack} from '@mui/material'
import LeftCard from './LeftCard/LeftCard'
import RightCard from './RightCard/RightCard'
import Header from "../Header/Header";
import {getStationData} from '../../API/availableStationAPI'
import Footer from "../Footer/Footer";
import {getRoutesDetails} from "../../API/routeDetailsAPI";
import _ from "lodash";

const MyComponent = () => {
    const [departStation, setDepartStation] = useState('')
    const [arriveStation, setArriveStation] = useState('')
    const [ticketNum, setTicketNum] = useState(0)
    const [showTicketDetails, setShowTicketDetails] = useState(false)
    const [stations, setStations] = useState([])
    const [stationsList, setStationsList] = useState([])
    const [stationsList2, setStationsList2] = useState([])
    const [routes, setRoutes] = useState([])
    const [ticketPrice, setTicketPrice] = useState()

    useEffect(() => {
        setStations(getStationData())
        setStationsList(getStationData())
        setStationsList2(getStationData())
    }, [])

    useEffect(() => {
        if (departStation !== '' && arriveStation !== '') {
            setShowTicketDetails(true)

            getRoutesDetails(departStation, arriveStation)
                .then(res => {
                    console.log(res)
                    let arr = [];

                    for (let i = 0; i < res.num; i++) {
                        let currentRouteSuggestion = res.routeSuggestion[i], routePassThrough = [];

                        currentRouteSuggestion.forEach(stations => {
                            if (_.isEmpty(routePassThrough) || !routePassThrough.includes(stations.routeTitle)){
                                routePassThrough.push(stations.routeTitle)
                            }
                        })

                        arr.push({
                            routePassing: routePassThrough,
                            suggestRoute: currentRouteSuggestion,
                            distance: res.routeDistance[i],
                            timeTaken: res.routeTimeTaken[i]
                        })
                    }

                    setRoutes(arr);
                    setTicketPrice(res.ticketPrice);
                })

        } else setShowTicketDetails(false)
    }, [departStation, arriveStation, setShowTicketDetails])

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

    return (
        <Stack spacing={3} className="bgBody bgImg">
            <Header/>

            <Container className="default-font blueFont">
                <Box className="default-font blueFont bold title">CHOOSE YOUR DESTINATION</Box>
            </Container>

            <Box className="default-font flexContainer">
                <LeftCard
                    departStation={departStation}
                    setDepartStation={departCallback}
                    arriveStation={arriveStation}
                    setArriveStation={arriveCallback}
                    showTicketDetails={showTicketDetails}
                    ticketNum={ticketNum}
                    setTicketNum={ticketNumCallback}
                    ticketPrice={ticketPrice}
                    stations1={stationsList}
                    stations2={stationsList2}
                />

                <Collapse orientation="horizontal" in={showTicketDetails} >
                    <RightCard routes={routes}/>
                </Collapse>
            </Box>

            <Footer/>
        </Stack>
    )
}

export default MyComponent
