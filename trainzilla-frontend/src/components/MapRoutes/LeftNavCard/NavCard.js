import React, {useEffect, useState} from 'react';
import {Box, Button, Card, CardContent, Divider, Paper} from "@mui/material";
import "../../../styles/css/mapRoute.sass"
import "../../../styles/Font/fonts.sass"
import {getRouteData} from "../../../API/RouteDataAPI";

function NavCard({rightContent}) {
    const [routeData, setRouteData] = useState([])
    const [routeNameArr, setRouteNameArr] = useState([])

    useEffect(() => {
        getRouteData().then(res => setRouteData(res));
    }, [])

    useEffect(() => {
        if (routeData !== []) {
            setRouteNameArr(routeData.flatMap(route => route.routeTitle));
        }
    }, [routeData])

    return (
        <Card
            elevation={20}
            className="leftNav"
        >
            <CardContent className="default-font">
                <Button
                    className="buttonNav bold"
                    onClick={() => {
                        rightContent('map')
                    }}
                    sx={{ color: '#004684' }}
                >
                    Train Route Map
                </Button>

                <Divider sx={{mt: '1vw'}}/>
                <Box className="greyFont title timetableButtons">

                    <Box className="navTitle">
                        Train Timetable
                    </Box>

                    <Box className="buttons">
                        {
                            routeNameArr.map((name, i) =>
                                <Button
                                    key={i}
                                    className="buttonNav default-font bold"
                                    onClick={()=>{
                                        rightContent(name)
                                    }}
                                    sx={{ color: '#004684' }}
                                >
                                    {name}
                                </Button>
                            )
                        }
                    </Box>

                </Box>
            </CardContent>
        </Card>
    );
}

export default NavCard;