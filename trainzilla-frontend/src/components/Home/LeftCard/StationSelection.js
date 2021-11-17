import React from 'react'
import {
    Divider,
    IconButton,
    InputBase,
    Menu,
    MenuItem,
    Paper,
} from '@mui/material'
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined'
import '../../../styles/css/homepage.sass'
import '../../../styles/Font/fonts.sass'

const StationSelection = ({stationName, setStationName, stations}) => {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleStationChange = (e) => {
        setStationName(e.target.innerText)
        setAnchorEl(null)
    }


    let menuStationList = stations
        ? stations.map((current, index) => (
            <MenuItem
                key={index}
                onClick={handleStationChange}
                sx={{fontSize: '1vw', p: '0.5vw'}}
            >
                {' '}
                {current}
                {' '}
            </MenuItem>
        ))
        : null

    return (
        <Paper
            component="form"
            elevation={5}
            sx={{
                m: '0.5vw 0.3vw 3vw 0',
                p: '0.3vw 0.6vw',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
            }}
        >
            <InputBase
                sx={{ml: '0.5vw', flex: 1, fontSize: '1.1vw'}}
                placeholder="Please select a station."
                value={stationName}
                onChange={handleStationChange}
            />

            <IconButton
                color="primary"
                sx={{p: '0.5vw'}}
                aria-label="directions"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <ArrowDropDownCircleOutlinedIcon sx={{fontSize: '1.5vw'}}/>
            </IconButton>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleStationChange}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    horizontal: 240,
                }}
                style={{top: 5}}
                PaperProps={{
                    style: {
                        maxHeight: '20vw',
                        width: '20vw',
                    },
                }}
            >
                {menuStationList}
            </Menu>
        </Paper>
    )
}


export default StationSelection;