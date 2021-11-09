import React from 'react';
import {Box, Button, Card, CardContent, Divider} from "@mui/material";
import "../../../styles/css/mapRoute.sass"
import "../../../styles/Font/fonts.sass"

function NavCard({rightContent}) {

    return (
        <Card
            elevation={20}
            className="leftNav"
        >
            <CardContent className="default-font">
                <Button className="button" onClick={rightContent('map')}>Train Route Map</Button>
                <Divider sx={{mt: '1vw'}}/>
                <Box className="greyFont title" sx={{margin: "1vw", mb: '2vw'}}>
                    Train Timetable

                    <Button className="button" onClick={rightContent('ampang')}>Ampang Route</Button>

                </Box>
            </CardContent>
        </Card>
    );
}

export default NavCard;