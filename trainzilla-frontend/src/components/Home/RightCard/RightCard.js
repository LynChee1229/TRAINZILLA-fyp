import React, {useState} from 'react'
import {Box, Button, Card, CardContent, Paper, Stack} from '@mui/material'
import '../../../styles/css/homepage.sass'
import '../../../styles/Font/fonts.sass'
import _ from "lodash";
import RouteDetails from "./RouteDetails";

const RightCard = ({routes}) => {

    const [openRouteDetail, setOpenRouteDetail] = useState(false);

    const handleClickOpen = () => {
        setOpenRouteDetail(true);
        // console.log(routes)
    };

    const setOpenDialogCallback = (bool) => {
        setOpenRouteDetail(bool)
    }

    const routeDetail = (suggestion) => {
        let path = "", routePath;

        routePath = suggestion.routePassing;
        for (let i = 0; i < routePath.length; i++) {
            if (_.isEmpty(path)) {
                path = routePath[i];
            } else {
                path += " >> " + routePath[i];
            }
        }

        return <Box className="default-font routeBox">
            <Paper className="center routeDetails">{path.toUpperCase()}</Paper>
            <Button
                variant="outlined"
                className="button default-font bold"
                sx={{color: '#004684', fontSize: '1vw'}}
                onClick={handleClickOpen}
            >
                View Route Details
            </Button>
        </Box>


    }

    return (
        <Card elevation={15} className="default-font rightCard">
            <CardContent>
                {
                    routes.map((suggestion, i) =>
                        (
                            <Stack key={i}>
                                {routeDetail(suggestion)}
                                <RouteDetails
                                    openDialog={openRouteDetail}
                                    setOpenDialog={setOpenDialogCallback}
                                    routes={suggestion}
                                />
                            </Stack>
                        )
                    )
                }

            </CardContent>
        </Card>
    )
}

export default RightCard
