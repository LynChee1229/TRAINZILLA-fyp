import React, {useState} from 'react'
import '../../styles/css/profile-user.sass'
import '../../styles/css/announcement.sass';
import $ from 'jquery'
import {FaEdit , FaRegCheckCircle} from 'react-icons/fa';
import {BsXCircle} from 'react-icons/bs'
import { Modal, Button, Alert } from 'react-bootstrap';
import { TextField } from '@mui/material';

const ProfileInfo = () => {
    const user = JSON.parse(localStorage.getItem('user-info'))

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [display, setDisplay] = useState(false);
    const closeModal = () => setDisplay(false);
    const displayModal = () => setDisplay(true);

    const [currentPassword, setCurrentPassword] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [dltPW, setDltPW] = useState('')
    
    const [errorCurrentPW, setErrorCurrentPW] = useState('')
    const [errorNewPW, setErrorNewPW] = useState('')
    const [errorConfirmPW, setErrorConfirmPW] = useState('')
    const [errordltPW, setErrorDltPW] = useState('')

    $(document).on('click', '.editIcon', function() {
        $(this).parent().addClass('d-none');
        $(this).closest('.wrapInfo').find('.inputContainer').removeClass('d-none');
        $(this).closest('.wrapInfo').find('input').focus();
    });

    $(document).on('click', '.discardBtn', function() {
        $(this).closest('.wrapInfo').find('.inputContainer').addClass('d-none');
        $(this).closest('.wrapInfo').find('.profileInfo').removeClass('d-none');
    });

    $(document).on('click', '.saveInfo', async function() {
        $(this).closest('.wrapInfo').find('.alertMsg').html("");
        var type = $(this).val();
        var value = $(this).closest('.wrapInfo').find('input').val();

        if( (value!=="") && (value!=="undefined") ) {
            var error = 0;
            if (type === "email") {
                if(value == user.userEmail) {
                    $(this).closest('.wrapInfo').find('.inputContainer').addClass('d-none');
                    $(this).closest('.wrapInfo').find('.profileInfo').removeClass('d-none');
                    return true;
                }
                var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
                if (!pattern.test(value)) {
                    error++;
                    $(this).closest('.wrapInfo').find('.alertMsg').html("Invalid email address format!");
                }
            }
            
            if(type === "contact") {
                if(value == user.userContact) {
                    $(this).closest('.wrapInfo').find('.inputContainer').addClass('d-none');
                    $(this).closest('.wrapInfo').find('.profileInfo').removeClass('d-none');
                    return true;
                }
                var phone = /^([1]{1}[0-9]{8})$|^([1]{1}[0-9]{9})$|^([0]{1}[1]{1}[0-9]{8})$|^([0]{1}[1]{1}[0-9]{9})$/;
                if(!phone.test(value)) {
                    error++;
                    $(this).closest('.wrapInfo').find('.alertMsg').html("Invalid phone number format! eg: 01XXXXXXXX");
                } 
            }

            if(type === "dob") {
                if(value == user.userDOB) {
                    $(this).closest('.wrapInfo').find('.inputContainer').addClass('d-none');
                    $(this).closest('.wrapInfo').find('.profileInfo').removeClass('d-none');
                    return true;
                }
                if( (value < "1900-01-01") || (value > "2015-12-31") ) {
                    error++;
                    $(this).closest('.wrapInfo').find('.alertMsg').html("Date must between 01-01-1900 and 31-12-2015");
                }
            }

            if(error === 0) {
                let item = {
                    uID: user.userID,
                    infoType: type,
                    infoValue: value,
                };

                let result = await fetch("http://localhost:8000/api/updateProfile", {
                    method: 'POST',
                    body: JSON.stringify(item),
                    headers: {
                        "Content-Type": 'application/json',
                        "Accept": 'application/json'
                    }
                });

                result = await result.json();

                if(result.error) {
                    $(this).closest('.wrapInfo').find('.alertMsg').html(result.error);
                } 
                else {
                    localStorage.setItem("user-info", JSON.stringify(result));
                    window.location.reload(false);
                }
            } 
        } else {
            $(this).closest('.wrapInfo').find('.alertMsg').html("Please fill in the detail!");
        } 

    });

    function submitPW() {
        let item = {
            uID: user.userID,
            oldPassword: currentPassword,
            newPassword: password,
        };

        let res = fetch("http://localhost:8000/api/resetPassword", {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        });
        res = res.json();
        if(res.success) {
            handleClose();
            $(window).scrollTop(0);
            $('.pwSuccess').removeClass('d-none');
            $('.pwSuccess').html(res.success);
            setTimeout(function() {
                $('.pwSuccess').addClass('d-none');
            }, 5000);
        } else if(res.fail) {
            $('#resetModal').find('.text-danger').html(res.fail);
        }
    }

    const handleResetPW = () => {
        var err = 0;

        if(currentPassword == "") {
            err++;
            setErrorCurrentPW("Please fill out this field.");
        } else {
            setErrorCurrentPW("");
        }
        if(password == "") {
            err++;
            setErrorNewPW("Please fill out this field.");
        } else {
            setErrorNewPW("");
        }
        if(confirmPassword == "") {
            err++;
            setErrorConfirmPW("Please fill out this field.");
        } else {
            setErrorConfirmPW("");
        }

        if(currentPassword && password && confirmPassword) {
            if(password.length < 8) {
                err++;
                setErrorNewPW("At least 8 characters!");
            } else {
                setErrorNewPW("");
            }
    
            if(password !== confirmPassword) {
                err++;
                setErrorConfirmPW("Password does not match!!");
            } else {
                setErrorConfirmPW("");
            }

            if(err === 0) {
                submitPW();
            }
        }
        
    }

    const confirmDltAcc = () => {
        if(dltPW === "") {
            setErrorDltPW("Please fill out this field.");
        } else {
            setErrorDltPW("");
        }

        // let item = {
        //     uID: user.userID,
        //     password: dltPW,
        // };

        // let res = fetch("http://localhost:8000/api/deleteUserAccount", {
        //     method: 'POST',
        //     body: JSON.stringify(item),
        //     headers: {
        //         "Content-Type": 'application/json',
        //         "Accept": 'application/json'
        //     }
        // });
        // res = res.json();
        // if(res.success) {
            
        // } else if(res.fail) {
        //     $('#deleteModal').find('.text-danger').html(res.fail);
        // }
    }

    return (
        <div id="infoComponent">
            <div class="userDetails">
                <Alert variant="success" className="pwSuccess d-none"></Alert>
                
                <div>
                    <span className="infoLabel">Username</span>
                    <p className="profileInfo">{(user.userName).charAt(0).toUpperCase() + (user.userName).slice(1)}</p>
                </div>

                <div className="wrapInfo">
                    <span className="infoLabel">Date of Birth</span>
                    <span className="alertMsg text-danger"></span>
                    <p className="profileInfo">{user.userDOB} 
                        <FaEdit className="editIcon"/> 
                    </p>
                    <p className="inputContainer d-none">
                        <input type="date" size="50" defaultValue={user.userDOB} min="1900-01-01" max="2015-12-31"/>
                        <button className="btn discardBtn"><BsXCircle/> CANCEL </button>
                        <button className="btn saveInfo" value="dob"><FaRegCheckCircle/> SAVE </button>
                    </p>
                </div>

                <div className="wrapInfo">
                    <span className="infoLabel">Email Address</span>
                    <span className="alertMsg text-danger"></span>
                    <p className="profileInfo">{user.userEmail} 
                        <FaEdit className="editIcon"/> 
                    </p>
                    <p className="inputContainer d-none">
                        <input type="email" defaultValue={user.userEmail} size="50" maxlength="40"/>
                        <button className="btn discardBtn"><BsXCircle/> CANCEL </button>
                        <button className="btn saveInfo" value="email"><FaRegCheckCircle/> SAVE </button>
                    </p>
                </div>

                <div className="wrapInfo">
                    <span className="infoLabel">Contact Number (+60)</span>
                    <span className="alertMsg text-danger"></span>
                    <p className="profileInfo">{user.userContact} 
                        <FaEdit className="editIcon"/> 
                    </p>
                    <p className="inputContainer d-none">
                        <input type="tel" defaultValue={user.userContact} size="50" maxlength="40" pattern="([1]{1}[0-9]{8})|([1]{1}[0-9]{9}|[0]{1}[1]{1}[0-9]{8})|([0]{1}[1]{1}[0-9]{9})"/>
                        <button className="btn discardBtn"><BsXCircle/> CANCEL </button>
                        <button className="btn saveInfo" value="contact"><FaRegCheckCircle/> SAVE </button>
                    </p>
                </div>
            </div>

            <button className="btn resetBtn mx-5 my-3" variant="primary" onClick={handleShow}>Reset Password</button>
            <button className="btn deleteBtn mx-5 my-3" onClick={displayModal}>Delete Account</button>

            <Modal show={show} onHide={handleClose}  size="md" aria-labelledby="contained-modal-title-vcenter" id="resetModal" centered>
                <Modal.Body style={{textAlign:'center'}}>
                    <div className="resetModalTitle">RESET PASSWORD</div>
                    <div className="text-danger"></div>
                    <div>
                        <TextField
                        id="currentPW"
                        className="pwInput"
                        label="Current Password"
                        type={'password'}
                        style={{margin:'20px'}}
                        inputProps={{maxLength:50, size:55}}
                        onChange={(e) => {
                            setCurrentPassword(e.target.value)
                        }}
                        variant="filled"
                        error={(errorCurrentPW !== "")}
                        helperText={errorCurrentPW}
                    /></div>
                    <div>
                        <TextField
                        id="newPW"
                        className="pwInput"
                        label="New Password"
                        type={'password'}
                        style={{margin:'20px'}}
                        inputProps={{maxLength:50, size:55}}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        variant="filled"
                        error={(errorNewPW !== "")}
                        helperText={errorNewPW}
                    /></div>
                    <div>
                        <TextField
                        id="confirmPW"
                        className="pwInput"
                        label="Confirm Password"
                        type={'password'}
                        style={{margin:'20px'}}
                        inputProps={{maxLength:50, size:55}}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value)
                        }}
                        variant="filled"
                        error={(errorConfirmPW !== "")}
                        helperText={errorConfirmPW}
                    /></div>
                    
                    <Button onClick={handleResetPW} className="confirmResetBtn">CONFIRM RESET</Button>
                    <Button onClick={handleClose} className="closeBtn">
                        Close
                    </Button>
                </Modal.Body>
            </Modal>

            <Modal show={display} onHide={closeModal}  size="md" aria-labelledby="contained-modal-title-vcenter" id="deleteModal" centered>
                <Modal.Body style={{textAlign:'center'}}>
                    <div className="deleteTitle">Are you sure to delete your account? </div>
                    <div className="text-primary">Please enter your account password for verification purpose.</div>
                    <div>
                        <TextField
                        id="dltPW"
                        className="pwInput"
                        label="Your Account Password"
                        type={'password'}
                        style={{margin:'20px'}}
                        inputProps={{maxLength:50, size:55}}
                        onChange={(e) => {
                            setDltPW(e.target.value)
                        }}
                        variant="filled"
                        error={(errordltPW !== "")}
                        helperText={errordltPW}
                    /></div>
                    <div className="text-danger">Warning: The account will be permanently deleted, and all points and coupons will become invalid.</div>
                    <Button className="deleteAccBtn" onClick={confirmDltAcc}>CONFIRM DELETE ACCOUNT</Button>
                    <Button onClick={closeModal} className="closeBtn">
                        Close
                    </Button>
                </Modal.Body>
            </Modal>
            
        </div>
    )

}

export default ProfileInfo