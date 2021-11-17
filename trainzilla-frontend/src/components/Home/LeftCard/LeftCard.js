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
        // setStationList(depart);
        setDepartStation(depart);

        // console.log(stationList)
    }
    const arriveCallback = (arrive) => {
        // setStationList(arrive);
        setArriveStation(arrive);

        // console.log(stationList)
    }
    const ticketNumCallback = (ticketNum) => {
        setTicketNum(ticketNum);
    }

    return (
        <Card
            elevation={20}
            className="leftCard"
        >
            <CardContent className="blueFont">
                <Box
                    sx={{mb: 13}}
                >
                    <Box className="bold" style={{fontSize: "1vw"}}>DEPARTURE STATION</Box>
                    <StationSelection
                        stationName={departStation}
                        setStationName={departCallback}
                        stations={stations1}
                    />

                    <Box className="center">
                        <Box className="bold" sx={{flexGrow: 1}} style={{fontSize: "1vw"}}>
                            ARRIVAL STATION
                        </Box>
                        <IconButton
                            color="primary"
                            sx={{p: '5px', m: '-10px 0 -10px 0'}}
                            onClick={stationSwitching}
                        >
                            <ImportExportIcon/>
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
                />
            </CardContent>
        </Card>
    )
}

export default LeftCard
