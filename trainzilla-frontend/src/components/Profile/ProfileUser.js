import React, { useEffect, useState} from 'react'
import '../../styles/css/profile.sass';
import axios from 'axios';

import Edit from '@mui/icons-material/Edit';
import Button from "@mui/material/Button";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

        
function ProfileUser(){
    const [open, setOpen] = React.useState(false);
    const [openRe, setOpenRe] = React.useState(false);
    const [openDel, setOpenDel] = React.useState(false);

    const openEdit = () => { setOpen(true)};
    const closeEdit = () => { setOpen(false)};

    const openReset = () => { setOpenRe(true)};
    const closeReset = () => { setOpenRe(false)};

    const openDelete = () => { setOpenDel(true)};
    const closeDelete = () => { setOpenDel(false)};

    const [data, setData] = useState(''); 

    /*useEffect(() => {
        axios.get('http://localhost:8000/api/profileuser')
        .then(res => {
            const data = res.data
            this.setState({ data });
        })
        .catch(function (error) {
            console.log(error);
        })
    }); */
    
    return (
        <div id="ProfileUserComponent">
            {/*{
            this.state.data.map((aitem) => */}
            <div className="leftBox">
                <div class="title">Username</div>
                    {/*<div className="name">{aitem.userName}</div>*/}
                    <div className="name">Irdina</div>
                <div class="hr"><hr></hr></div>
                <div class="title">Date of Birth</div>
                    {/*<div className="name">{aitem.userDOB}</div>*/}
                    <div className="name">22/04/2001</div>
                <div class="hr"><hr></hr></div>
                <div class="title">Email</div>
                    {/*<div className="name">{aitem.userEmail}</div>*/}
                    <div className="name">irdina@gmail.com</div>
                <div class="hr"><hr></hr></div>
                <div class="title">Phone Number</div>
                    {/*<div className="name">{aitem.userContact}</div>*/}
                    <div className="name">013455678</div>

                <div class="editBtn" onClick={openEdit}>Edit<Edit></Edit></div>
            </div>
           {/*} )}*/}

                <Dialog PaperProps={{
                                style: { borderRadius: "20px", border: "2px solid black"}
                                }}
                open={open} onClose={closeEdit}>
                    <DialogTitle>EDIT PROFILE</DialogTitle>
                    <DialogContent >
    
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Username"
                                type="text"
                                fullWidth
                                variant="standard"
                            /> 
                        
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Email Address"
                                type="email"
                                fullWidth
                                variant="standard"
                            /> 

                            <TextField
                            autoFocus
                            margin="dense"
                                id="date"
                                label="Birthday"
                                type="date"
                                defaultValue="2001-04-22"
                                fullWidth
                                variant="standard"
                            />

                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Phone Number"
                                type="phone"
                                fullWidth
                                variant="standard"
                            /> 
                            
                    </DialogContent>

                    <DialogActions >   
                        <Button style={{color: "black"}} onClick={closeEdit}>CANCEL</Button>
                        <Button style={{color: "black"}} onClick={closeEdit} autoFocus>CONFIRM</Button>
                    </DialogActions>
                </Dialog>

                <div class="rightBox">
                    <div id="reset" onClick={openReset}>Reset Password</div>
                    <div id="deleteAcc" onClick={openDelete}>Delete Account</div>
                </div>

                <Dialog PaperProps={{
                                style: { borderRadius: "20px", border: "2px solid black"}
                                }}
                open={openRe} onClose={closeReset}>
                    <DialogTitle>Reset Password</DialogTitle>
                    <DialogContent >
    
                            <TextField
                                autoFocus
                                margin="dense"
                                id="currPass"
                                label="Current Password"
                                type="password"
                                fullWidth
                                variant="standard"
                            /> 
                        
                            <TextField
                                autoFocus
                                margin="dense"
                                id="newPass"
                                label="New Password"
                                type="password"
                                fullWidth
                                variant="standard"
                            /> 

                            <TextField
                                autoFocus
                                margin="dense"
                                id="newPass"
                                label="Re-enter new Password"
                                type="password"
                                fullWidth
                                variant="standard"
                            /> 
                            
                    </DialogContent>

                    <DialogActions >   
                        <Button style={{color: "black"}} onClick={closeReset}>CANCEL</Button>
                        <Button style={{color: "black"}} onClick={closeReset} autoFocus>CONFIRM</Button>
                    </DialogActions>

                </Dialog>
                <Dialog PaperProps={{
                                style: { borderRadius: "20px", border: "2px solid black"}
                                }}
                open={openDel} onClose={closeDelete}>
                    <DialogTitle>Are you sure you want to delete your account? We will miss you <SentimentVeryDissatisfiedIcon/></DialogTitle>
                    <DialogContent >
    
                            <TextField
                                autoFocus
                                margin="dense"
                                id="delete"
                                label="Enter password to delete account"
                                type="password"
                                fullWidth
                                variant="standard"
                            /> 
                            
                    </DialogContent>

                    <DialogActions >   
                        <Button style={{color: "black"}} onClick={closeDelete}>CANCEL</Button>
                        <Button style={{color: "black"}} onClick={closeDelete} autoFocus>CONFIRM</Button>
                    </DialogActions>
                </Dialog>
        </div>
        
        );
                          
    } 

export default ProfileUser