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
            <MenuItem key={index} onClick={handleStationChange}>
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
                m: '10px 0 30px 5px',
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
            }}
        >
            <InputBase
                sx={{ml: 1, flex: 1}}
                placeholder="Please select a station."
                value={stationName}
                onChange={handleStationChange}
            />

            <Divider sx={{height: 28, m: 0.5}} orientation="vertical"/>
            <IconButton
                color="primary"
                sx={{p: '10px'}}
                aria-label="directions"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <ArrowDropDownCircleOutlinedIcon/>
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
