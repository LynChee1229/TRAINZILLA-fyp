import React, {useState} from 'react'
import {Box, Button, Card, CardContent, Paper, Stack} from '@mui/material'
import '../../../styles/css/homepage.sass'
import '../../../styles/Font/fonts.sass'
import _ from "lodash";
import RouteDetails from "./RouteDetails";
import MapIcon from '@mui/icons-material/Map';
import TimelapseIcon from '@mui/icons-material/Timelapse';

const RightCard = ({routes}) => {

    const [openRouteDetail, setOpenRouteDetail] = useState(false);

    const handleClickOpen = () => {
        setOpenRouteDetail(true);
        console.log(routes)
    };

    const setOpenDialogCallback = (bool) => {
        setOpenRouteDetail(bool)
    }

    const getTime = (time) => {

        let h = Math.floor(time / 60 / 60), m = Math.floor(time / 60), s = ((time / 60) % 1).toFixed(1) * 60;

        do {
            if (h > 24) h -= 24;
            if (m > 60) m -= 60;
            if (s > 60) s -= 60;
        } while (h > 24 || m > 60 || s > 60);

        if (h > 1 && h !== 0) h += ' hours '; else h += ' hour '
        if (m > 1 && m !== 0) m += ' minutes '; else m += ' minute '
        if (s > 1 && s !== 0) s += ' seconds '; else s += ' second '

        if (h === '0 hour ') h = '';
        if (m === '0 minute ') m = '';
        if (s === '0 second ') s = '';

        return h+m+s;


    }

    const path = (routePath) => {
        let path;
        for (let i = 0; i < routePath.length; i++) {
            if (_.isEmpty(path)) {
                path = routePath[i];
            } else {
                path += " >> " + routePath[i];
            }
        }
        return path;
    }

    const routeDetail = (suggestion) => {
        let distance = suggestion.distance, timeTaken = suggestion.timeTaken;

        // routePath = suggestion.routePassing;
        // for (let i = 0; i < routePath.length; i++) {
        //     if (_.isEmpty(path)) {
        //         path = routePath[i];
        //     } else {
        //         path += " >> " + routePath[i];
        //     }
        // }

        return (
            <Box className="default-font routeBox">
                <Paper className="routeDetails">
                    <Box className="center bold blueFont">{path(suggestion.routePassing).toUpperCase()}</Box>
                    <Box className="center space">
                        <Box>
                            <MapIcon sx={{fontSize: '1vw'}} color="secondary"/> {' '}
                            Distance: {distance.toFixed(2)} km
                        </Box>
                        <Box>
                            <TimelapseIcon sx={{fontSize: '1vw'}} color="secondary"/> {' '}
                            {getTime(timeTaken)}
                            {/* {dayjs(timeTaken).format('m')} minutes*/}
                        </Box>
                    </Box>
                </Paper>

                <Button
                    variant="outlined"
                    className="button default-font bold"
                    sx={{color: '#004684', fontSize: '1vw'}}
                    onClick={handleClickOpen}
                >
                    View Route Details
                </Button>
            </Box>
        )

    }

    return (
        <Card elevation={15} className="default-font rightCard">
            <CardContent className="cardBox">
                {
                    routes.map((suggestion, i) => {
                        if (i < 3) {
                            return (
                                <Stack key={i}>
                                    {routeDetail(suggestion)}
                                    <RouteDetails
                                        openDialog={openRouteDetail}
                                        setOpenDialog={setOpenDialogCallback}
                                        routes={suggestion}
                                        path={path(suggestion.routePassing).toUpperCase()}
                                    />
                                </Stack>
                            )
                        } else {
                            return null
                        }
                    })
                }

            </CardContent>
        </Card>
    )
}

export default RightCard
