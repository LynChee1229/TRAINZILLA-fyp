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
                <Box className="center" style={{fontSize:"1.2vw", marginBottom:'1vw'}}>
                    <Box sx={{flexGrow: 1}} className="bold">Price per ticket:</Box>
                    <Box>RM 0.00</Box>
                </Box>

                <Box className="center">
                    <Box className="bold" sx={{flexGrow: 1}} style={{fontSize:"1.2vw"}}>Ticket Amount:</Box>
                    <Box className="center">
                        <IconButton
                            onClick={() => {
                                if (ticketNum !== 0) setTicketNum(ticketNum -1)
                            }}
                            color="primary"
                            sx={{p: '1vw', m: '-1vw 0 -1vw 0'}}
                        >
                            <RemoveIcon sx={{fontSize: '1.5vw'}}/>
                        </IconButton>

                        <span className="center" style={{width: '1.5vw', fontSize:"1.2vw"}}>
                            {ticketNum}
                        </span>

                        <IconButton
                            onClick={() => {
                                setTicketNum(ticketNum +1)
                            }}
                            color="primary"
                            sx={{p: '1vw', m: '-1vw -1vw -1vw 0'}}
                        >
                            <AddIcon sx={{fontSize: '1.5vw'}}/>
                        </IconButton>
                    </Box>
                </Box>

                <Button
                    variant="contained"
                    className="bookingButton"
                    onClick={handleBookTicketButton}
                    sx={{fontSize:'1vw'}}
                >
                    <ShoppingCartIcon sx={{mr:"1vw", fontSize: '1.5vw'}}/>
                    Book Ticket
                </Button>
            </Box>
        )
    } else return null
}

export default TicketDetails
