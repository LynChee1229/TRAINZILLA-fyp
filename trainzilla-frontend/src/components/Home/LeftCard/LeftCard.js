import React from 'react'
import {Box, Card, CardContent, IconButton} from '@mui/material'
import ImportExportIcon from '@mui/icons-material/ImportExport'
import TicketDetails from "./TicketDetails";
import '../../../styles/css/homepage.sass'
import '../../../styles/Font/fonts.sass'
import StationSelection from './StationSelection'

const LeftCard = (props) => {
    const {
        departStation,
        setDepartStation,
        arriveStation,
        setArriveStation,
        ticketNum,
        setTicketNum,
        ticketPrice,
        showTicketDetails,
        stations1,
        stations2,
        // setStationList
    } = props


    const stationSwitching = () => {
        let arrive = arriveStation
        setArriveStation(departStation)
        setDepartStation(arrive)
    }

    const departCallback = (depart) => {
        setDepartStation(depart);
    }
    const arriveCallback = (arrive) => {
        setArriveStation(arrive);
    }
    const ticketNumCallback = (ticketNum) => {
        setTicketNum(ticketNum);
    }

    return (
        <Card
            elevation={20}
            className="leftCard"
        >
            <CardContent className="blueFont" >
                <Box>
                    <Box className="bold" sx={{fontSize: "1vw"}}>DEPARTURE STATION</Box>
                    <StationSelection
                        stationName={departStation}
                        setStationName={departCallback}
                        stations={stations1}
                    />

                    <Box className="center">
                        <Box className="bold" sx={{flexGrow: 1, fontSize: "1vw"}} >
                            ARRIVAL STATION
                        </Box>
                        <IconButton
                            color="primary"
                            sx={{m: '-1vw 0 -1vw 0'}}
                            onClick={stationSwitching}
                        >
                            <ImportExportIcon sx={{fontSize: '1.5vw'}}/>
                        </IconButton>
                    </Box>

                    <StationSelection
                        stationName={arriveStation}
                        setStationName={arriveCallback}
                        stations={stations2}
                    />
                </Box>

                <TicketDetails
                    departStation={departStation}
                    arriveStation={arriveStation}
                    showTicketDetails={showTicketDetails}
                    ticketNum={ticketNum}
                    setTicketNum={ticketNumCallback}
                    ticketPrice={parseFloat(ticketPrice).toFixed(2)}
                />
            </CardContent>
        </Card>
    )
}

export default LeftCard
