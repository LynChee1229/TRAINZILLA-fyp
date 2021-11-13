import React from 'react'
import {Box, Button, Divider, IconButton} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import '../../../styles/css/homepage.sass'
import '../../../styles/Font/fonts.sass'

const TicketDetails = (props) => {
    const {
        ticketNum,
        setTicketNum,
        showTicketDetails,
        departStation,
        arriveStation,
    } = props

    const handleBookTicketButton = () => {
        console.log('here', departStation, arriveStation)
    }

    if (showTicketDetails) {
        return (
            <Box className="ticketDetailBox">
                <Box sx={{mb: 5}} className="bold center" style={{fontSize:"16px"}}>
                    <Box sx={{flexGrow: 1}}>Price per ticket:</Box>
                    <Box>RM 0.00</Box>
                </Box>

                <Box
                    // sx={{
                    //     pb: '5px',
                    // }}
                    className="bold center"
                >
                    <Box sx={{flexGrow: 1}} style={{fontSize:"16px"}}>Ticket Amount:</Box>
                    <Box className="center">
                        <IconButton
                            onClick={() => {
                                if (ticketNum !== 0) setTicketNum(ticketNum -1)
                            }}
                            color="primary"
                            sx={{p: '5px', m: '-5px 0 -5px 0'}}
                        >
                            <RemoveIcon/>
                        </IconButton>
                        <Divider
                            sx={{height: 20, m: '0 10px 0 10px'}}
                            orientation="vertical"
                        />
                        <span className="center" style={{fontSize:"21px", paddingTop:"8px"}}>
                            {ticketNum}
                        </span>
                        <Divider
                            sx={{height: 20, m: '0 10px 0 10px'}}
                            orientation="vertical"
                        />
                        <IconButton
                            onClick={() => {
                                setTicketNum(ticketNum +1)
                            }}
                            color="primary"
                            sx={{p: '5px', m: '-5px 0 -5px 0'}}
                        >
                            <AddIcon/>
                        </IconButton>
                    </Box>
                </Box>

                <Button
                    variant="contained"
                    className="center bookingButton"
                    onClick={handleBookTicketButton}
                >
                    <ShoppingCartIcon/>
                    Book Ticket
                </Button>
            </Box>
        )
    } else return null
}

export default TicketDetails
