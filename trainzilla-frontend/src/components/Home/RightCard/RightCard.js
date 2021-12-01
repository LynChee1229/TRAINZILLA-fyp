import React, {useEffect, useState} from 'react'
import {Box, Button, Card, CardContent, Paper, Stack} from '@mui/material'
import '../../../styles/css/homepage.sass'
import '../../../styles/Font/fonts.sass'
import _ from "lodash";
import RouteDetails from "./RouteDetails";
import MapIcon from '@mui/icons-material/Map';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import $ from 'jquery'

const RightCard = ({routes}) => {

    const [route, setRoute] = useState(routes);
    const [openRouteDetail, setOpenRouteDetail] = useState(false);
    const [clickIndex, setClickIndex] = useState(0);

    useEffect(() => {
        setRoute(routes)
    },[routes])
    console.log(routes)

    if (!_.isEmpty(route))  {
        $('.loader').addClass('d-none');
    }

    const handleClickOpen = (index) => {
        setOpenRouteDetail(true);
        setClickIndex(index);
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

    const path = (route) => {
        if(route){
            let path = '', routePath = route["routePassing"];
            for (let i = 0; i < routePath.length; i++) {
                if (_.isEmpty(path)) {
                    path = routePath[i];
                } else {
                    path += " >> " + routePath[i];
                }
            }
            return path.toUpperCase();
        }else return '';

    }

    const routeDetail = (suggestion, index) => {
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
                    <Box className="center bold blueFont">{path(suggestion).toUpperCase()}</Box>
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
                    onClick={() => handleClickOpen(index)}
                >
                    View Route Details
                </Button>
            </Box>
        )

    }

    return (
        <Card elevation={15} className="default-font rightCard">
            <div className="loader"></div>
            <CardContent className="cardBox">
                {
                    route.map((suggestion, i) => {
                        if (i < 3) {
                            return (
                                <Stack key={i}>
                                    {routeDetail(suggestion, i)}
                                    {/*<RouteDetails*/}
                                    {/*    openDialog={openRouteDetail}*/}
                                    {/*    setOpenDialog={setOpenDialogCallback}*/}
                                    {/*    routes={suggestion}*/}
                                    {/*    path={path(suggestion.routePassing).toUpperCase()}*/}
                                    {/*/>*/}
                                </Stack>
                            )
                        } else {
                            return null
                        }
                    })
                }
                <RouteDetails
                    openDialog={openRouteDetail}
                    setOpenDialog={setOpenDialogCallback}
                    routes={route[clickIndex]}
                    path={path(route[clickIndex])}
                />

            </CardContent>
        </Card>
    )
}

export default RightCard
