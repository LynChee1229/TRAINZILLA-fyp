import React , { useEffect , useState } from 'react';
import '../../styles/css/profile_ticket.sass'
import $ from 'jquery';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import { FiLink2 } from "react-icons/fi"
import TicketQRcode from './TicketQRcode';
import { Modal } from 'react-bootstrap';

const ProfileTicket = ({newTicket}) => {
    const user = JSON.parse(localStorage.getItem('user-info'))
    const [point, setPoint] = useState('')
    const [voucher, setVoucher] = useState('')
    const [ticket, setTicket] = useState([])
    const [QRticket, setQRticket] = useState([])

    const [showQR, setShow] = useState(false);
    const handleClose = () => setShow(false);

    function handleShow(tUC) {
        setQRticket(tUC)
        setShow(true);
    }

    window.onunload = function(){
        alert("unload event detected!");
    }

    useEffect(() => {
        getTicketDetails();
    }, []);

    $(document).ready(function() {
        if(newTicket.length > 0) {
            $('.paymentSuccess').removeClass('d-none');
            $('.newRow').parent().css('background-color', '#E5FFE5');
            $('.newRow').parent().css('font-weight', 'bold');
        }
    });

    async function getTicketDetails () {
            let item = {
                uUC: user.userUniqueCode,
            };
    
            let res = await fetch("http://localhost:8000/api/userTicketDetails", {
                method: 'POST',
                body: JSON.stringify(item),
                headers: {
                    "Content-Type": 'application/json',
                    "Accept": 'application/json'
                }
            });
            res = await res.json(); 
            if(res) {
                setPoint(res.userPoint);
                setVoucher(res.userVoucher);
                setTicket(res.ticket);

                $('#ticketTable').DataTable({
                    "aaSorting": [],
                    columnDefs: [
                        { orderable: false, targets: [1,2] } ,
                    ],
                    "order": [[ 0, 'desc' ]]
                });

                if(res.userPoint < 2000) {
                    $('.redeemBtn').prop("disabled", true);
                }
            } 
    }

    async function redeemPoint () {
        let item = {
            uUC: user.userUniqueCode,
        };
        let result = await fetch("http://localhost:8000/api/redeemPoint", {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        });
        result = await result.json(); 
        if(result) {
            setVoucher(result.userVoucher);
            setPoint(result.userPoint);
            if(result.userPoint < 2000) {
                $('.redeemBtn').prop("disabled", true);
            }
        } 
    }

    return (
        <div id="ticketComponent" className="d-none">

            <div className="paymentSuccess alert alert-success bold d-none">Payment Successful! Kindly check your mailbox for the E-receipt. The details of the new tickets are highlighted in the table below.</div>

            <div className="topDetails">
                <div>
                    Current Point(s): <span className="topData"> { point } </span>
                    <button className="btn redeemBtn" onClick={redeemPoint}> Redeem Voucher </button>
                    <div className="mention">* 2000 points can be redeemed for a voucher.</div>
                </div>

                <hr/>

                <div>
                    Available Voucher(s): <span className="topData"> { voucher } </span>
                    <div className="mention">* With a voucher, each ticket can enjoy a 10% discount. Only one voucher can be used for each transaction.</div>
                </div>
            </div>

            <div className="ticketContent">
                <table className="table table-bordered row-border" id="ticketTable">
                    <thead>
                        <tr>
                            <th className="tDate">Purchase Date</th>
                            <th className="tCode">Ticket Code</th>
                            <th className="tStation">Departure <span className="linkIcon"><FiLink2/><FiLink2/><FiLink2/></span> Arrival</th>
                        </tr>
                    </thead>
                    <tbody id="announcementTableBody">
                    {
                        ticket.map((item, key) =>
                        <tr key={key} value={item.ticketUniqueCode}>
                            {
                                newTicket.includes(item.ticketUniqueCode) ? <div className="newRow d-none"></div> : ""
                            }
                            <td className="tDate">
                                <div>
                                    { item.ticketPurchaseDate } <br/>
                                    <span className="expiryDate">Expires on { item.ticketExpiryDate }</span>
                                </div>
                            </td>
                            <td className="tCode">
                                <div>
                                    { item.ticketUniqueCode }
                                    {
                                        (item.ticketStatus == 1) ? <span className="activeStatus">Active</span> : (item.ticketStatus == 0) ? <span className="inactiveStatus">Invalid</span> : ""
                                    }
                                    {
                                        (item.ticketStatus == 1) ? <button className="btn qrBtn" onClick={() => handleShow(item.ticketUniqueCode)}>Show QR Code</button> : (item.ticketStatus == 0) ? "" : ""
                                    }
                                </div>
                            </td>
                            <td className="tStation">
                                <div>{ item.ticketDeparture } <span className="linkIcon"><FiLink2/><FiLink2/><FiLink2/></span> { item.ticketArrival }</div>
                            </td>
                        </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>


            <Modal size="md" show={showQR} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Body>
                    <TicketQRcode ticket={QRticket}/>
                </Modal.Body>
            </Modal>


        </div>
    )

}

export default ProfileTicket