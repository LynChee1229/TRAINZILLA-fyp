import React , { useEffect , useState } from 'react'
import { useLocation , useHistory } from "react-router-dom";
import Header from "../Header/Header";
import Footer from '../Footer/Footer';
import '../../styles/css/booking_confirmation.sass'
import $ from 'jquery'
import { BsBagCheckFill } from "react-icons/bs"
import axios from "axios";
import _ from "lodash";

const BookingConfirmation = () => {
    const location = useLocation()
    const history = useHistory()
    let user = JSON.parse(localStorage.getItem('user-info'))

    const [ticketNum, setTicketNum] = useState('')
    const [ticketPrice, setTicketPrice] = useState('')
    const [departStation, setDepartStation] = useState('')
    const [arriveStation, setArriveStation] = useState('')
    const [userName, setName] = useState(user.userName)
    const [userEmail, setEmail] = useState(user.userEmail)
    const [userContact, setContact] = useState(user.userContact)
    const [paymentMethod, setMethod] = useState('banking')
    const [userVoucher, setVoucher] = useState('')
    const [earnedPoint, setPoint] = useState('')
    const [payment, setPayment] = useState('')
    const [total, setTotal] = useState('')

    useEffect(() => {
        setTicketNum(location.state.ticketNum);
        setTicketPrice(location.state.ticketPrice);
        setDepartStation(location.state.departStation);
        setArriveStation(location.state.arriveStation);
        loadPage();
    }, [arriveStation, departStation, location, ticketNum, ticketPrice]);


    async function loadPage()
    {
        if(!user) {
            history.push('/sign-in');
        } else {
            let result = {};
            await axios.post("http://localhost:8000/api/bookingDetails", {
                uUC: user.userUniqueCode ,
                ticketNum: ticketNum ,
                ticketPrice: ticketPrice
            })
                .then(res => {
                    result = (res.data);
                })

            if(!_.isEmpty(result)) {
                setVoucher(result.userVoucher);
                setPoint(result.point);
                setPayment(result.payment);
                setTotal(result.total);
            }
        }
    }

    const handleChange = () => {
        const method = $('.form-select').val();
        setMethod(method);
    }

    async function proceedToPayment()
    {
        $('.loader').removeClass('d-none');
        let item = { 
            uUC: user.userUniqueCode ,
            ticketNum: ticketNum ,
            ticketPrice: ticketPrice , 
            departStation: departStation ,
            arriveStation: arriveStation , 
            userVoucher: userVoucher , 
            earnedPoint: earnedPoint , 
            payment: payment , 
            total: total ,
            paymentMethod: paymentMethod , 
        };
        let result = await fetch("http://localhost:8000/api/proceedToPayment", {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        });
        result = await result.json();
        if(result.status === "success") {
            history.push( {pathname: "/profile",
                state: {
                    tab: "ticket" ,
                    ticketUC: result.tuc ,
            }});
        } else {
            $('.dangerMsg').removeClass('d-none');
        }
    }

    function handleRefresh()
    {
        setInterval(function(){ 
            user = JSON.parse(localStorage.getItem('user-info'))
            setName(user.userName);
            setEmail(user.userEmail);
            setContact(user.userContact);
        }, 1000);
    }

    return (
        <div>
            <Header/>
            <div id="bookingBG">
                <div className="bookingTitle">BOOKING CONFIRMATION</div>
                <div className="dangerMsg alert alert-danger d-none">Failed to perform the action. Please refresh and try again, or contact helpdesk@trainzilla.com</div>
                <div className="bookingCard container">
                  
                    <div className="row">
                        <div className="col-lg-4 col-md">
                            Departure Station : 
                        </div>
                        <p className="col-lg-8 col-md">
                            {departStation}
                        </p>
                    </div>

                    <div className="row">
                        <div className="col-lg-4 col-md">
                            Arrival Station : 
                        </div>
                        <p className="col-lg-8 col-md">
                            {arriveStation}
                        </p>
                    </div>

                    <div className="row">
                        <div className="col-lg-4 col-md">
                            Each Ticket Fares : 
                        </div>
                        <p className="col-lg-8 col-md">
                            RM {Number(ticketPrice).toFixed(2)}
                        </p>
                    </div>

                    <div className="row">
                        <div className="col-lg-4 col-md">
                            Number of Tickets : 
                        </div>
                        <p className="col-lg-8 col-md">
                            {ticketNum}
                        </p>
                    </div>

                    <div className="row">
                        <div className="col-lg-4 col-md">
                            Payment : 
                        </div>
                        <p className="col-lg-8 col-md">
                            RM {Number(payment).toFixed(2)}
                        </p>
                    </div>

                    <div className="row">
                        <div className="col-lg-4 col-md">
                            Earned Points : 
                        </div>
                        <p className="col-lg-8 col-md">
                            {earnedPoint}
                        </p>
                    </div>

                    <div className="row">
                        <div className="col-lg-4 col-md">
                            User Name : 
                        </div>
                        <p className="col-lg-8 col-md">
                            {(userName).charAt(0).toUpperCase() + (userName).slice(1)}
                        </p>
                    </div>

                    <div className="row">
                        <div className="col-lg-4 col-md">
                            User Email : 
                        </div>
                        <p className="col-lg-8 col-md">
                            {userEmail}
                        </p>
                    </div>

                    <div className="row">
                        <div className="col-lg-4 col-md">
                            User Contact Number : 
                        </div>
                        <p className="col-lg-8 col-md">
                            +60 {userContact}
                        </p>
                    </div>

                    <div className="row">
                        <div className="col-lg-4 col-md">
                            Available Vouchers : 
                        </div>
                        <p className="col-lg-8 col-md">
                            {userVoucher ? userVoucher : '-'}
                        </p>
                    </div>

                    <div className="applyText">{userVoucher !== 0 ? "1 voucher will be applied automatically. 10% discount for each ticket." : "" }</div>

                    <div className="row">
                        <div className="col-lg-4 col-md totalText">
                            Final Payment :
                        </div>
                        <p className="col-lg-8 col-md totalText">
                            RM {Number(total).toFixed(2)}
                        </p>
                    </div>

                    <div className="row">
                        <div className="col-lg-4 col-md">
                            Payment Method : 
                        </div>
                        <p className="col-lg-8 col-md">
                            <select className="form-select" aria-label="form-select-sm" onChange={handleChange}>
                                <option value="banking" selected>Online Banking</option>
                                <option value="tngo">Touch N' Go</option>
                                <option value="grab">Grab Pay</option>
                                <option value="card">Credit Card / Debit Card</option>
                            </select>
                        </p>
                    </div>

                    <a href="/profile" target="_blank" onClick={handleRefresh}>
                        <small>The E-Receipt will be sent to the email above. <br/>
                        Click here if you wish to change your default email / contact</small>
                    </a>

                    <div className="d-flex">
                        <div>
                            <button className="btn paymentBtn" onClick={proceedToPayment}>
                                <BsBagCheckFill className="icon"/> PROCEED  TO  PAYMENT
                            </button>
                        </div>
                        <div className="loader d-none"></div>
                    </div>

                    <div className="foot">
                        <a href="/home">
                            Cancel Booking and Back to Home Page.
                        </a>
                        <br/>
                        <span className="reminder">* Reminder: Tickets will expire in 90 days.</span>
                    </div>

                </div>
                <Footer/>
            </div>
        </div>
    )
}

export default BookingConfirmation