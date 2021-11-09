import { React, Component } from 'react';
import '../../styles/css/profile.sass';
import axios from 'axios';
import $ from 'jquery';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"

class ProfileTicket extends Component {
    state = {
        data: []
    }

    componentDidMount() {
        axios.get('http://localhost:8000/api/profileticket')
        .then(res => {
            const data = res.data
            this.setState({ data });
        })
        .catch(function (error) {
            console.log(error);
        }); 
        
        $(document).ready(function () {
            setTimeout(function(){
                $('#ticketTable').DataTable({
                    "aaSorting": [],
                    "order": [[ 0, 'desc' ]]
                });
            }, 1000);
        });
    }

    render() {
        return(
            <div id="ticketComponent" className="d-none">
                <div className="top">
                    <div class="currPoint">
                        <div class="curr1">Your Current Point: 3450</div>
                     {/*total <div className="curr2">{aitem.userName}</div>*/}
                     {/* 1 sen = 1 point, 2000 points = one 10% voucher
                         total += aitem.ticketPrice;
                         total *= 100;
                         *total*
                     {aitem.ticketPrice}
                      */}
                    </div>

                    <div class="line"><hr></hr></div>

                    <div class="availVouch">
                        You have [ 1 ] available voucher
                         {/*
                            if(total % 2000 == 0){
                                total /= 2000
                            } */}
                            {/*total*/}
                    </div>
                </div>

                <table class="table table-bordered table-striped" id="announcementTable">
                    <thead>
                        <tr>
                            <th className="aDate">Purchase Date</th>
                            <th className="aID">Ticket ID</th>
                            <th className="aDep">Departure</th>
                            <th className="aArr">Arrival</th>
                            <th className="aPrice">Price</th>
                        </tr>
                    </thead>
                    <tbody id="ticketTableBody">
                    {/*{
                        this.state.data.map((aitem) => */}
                        <tr>
                            <td>
                                {/*<div className="aDate">{aitem.ticketPurchaseDate}</div>*/}
                                <div className="aDate">PurchaseDate1</div>
                                <div className="aDate">PurchaseDate2</div>
                            </td>
                            <td>
                                {/*<div className="aID">{aitem.ticketID}</div>*/}
                                <div className="aID">ticketID1</div>
                                <div className="aID">ticketID2</div>
                            </td>
                            <td>
                                {/*<div className="aDep">{aitem.ticketDeparture}</div>*/}
                                <div className="aDep">ticketDeparture1</div>
                                <div className="aDep">ticketDeparture2</div>
                            </td>
                            <td>
                                {/*<div className="aArr">{aitem.ticketArrival}</div>*/}
                                <div className="aArr">ticketArrival1</div>
                                <div className="aArr">ticketArrival2</div>
                            </td>
                            <td>
                                {/*<div className="aPrice">{aitem.ticketPrice}</div>*/}
                                <div className="aPrice">ticketPrice1</div>
                                <div className="aPrice">ticketPrice2</div>
                            </td>
                        </tr>
                        {/*)
                    }*/}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ProfileTicket