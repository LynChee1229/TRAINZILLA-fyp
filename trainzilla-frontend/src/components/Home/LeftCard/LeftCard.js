import React from 'react'
import { Box, Card, CardContent, IconButton } from '@mui/material'
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
        showTicketDetails,
        stations
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
            <CardContent className="default-font blueFont">
                <Box
                    sx={{ mb: 13 }}
                >
                    <Box className="bold">DEPARTURE STATION</Box>
                    <StationSelection
                        stationName={departStation}
                        setStationName={departCallback}
                        stations={stations}
                    />

                    <Box className="center">
                        <Box className="bold" sx={{ flexGrow: 1 }}>
                            ARRIVAL STATION
                        </Box>
                        <IconButton
                            color="primary"
                            sx={{ p: '5px', m: '-10px 0 -10px 0' }}
                            onClick={stationSwitching}
                        >
                            <ImportExportIcon />
                        </IconButton>
                    </Box>
                    <StationSelection
                        stationName={arriveStation}
                        setStationName={arriveCallback}
                        stations={stations}
                    />
                </Box>

                <TicketDetails

                    departStation={departStation}
                    arriveStation={arriveStation}
                    showTicketDetails={showTicketDetails}
                    ticketNum={ticketNum}
                    setTicketNum={ticketNumCallback}
                />
            </CardContent>
        </Card>
    )
}

export default LeftCard
