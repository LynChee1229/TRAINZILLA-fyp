import React from 'react'
import '../../styles/css/profile-user.sass'
import Header from "../Header/Header";

function ProfileTicket()
{
    return (
        <div className="profile-ticket">
            <Header />
            <div className="upper">
                <a href="/profile-user"><div className="inUpper1">User Information</div></a>
                <div className="inUpper2">Ticket & Voucher</div>
            </div>

            <div className="currPoint">
                <div className="curr1">Your Current Point:</div>
                <div className="curr2">2000</div>
            </div>

            <div className="line"><hr></hr></div>

            <div className="availVouch">
                <div className="avail1">You have [ ] available vouchers</div>
                <div className="avail2">Redeem</div>
            </div>

            <div className="table">
                <table>
                    <tr>
                        <th>TICKET ID</th>
                        <th>DATE PURCHASE</th>
                        <th>NUM</th>
                        <th>DEP ------- ARR</th>
                        <th>EXPIRY DATE</th>
                    </tr>
                    <tr>
                        <td>00001</td>
                        <td>DD/MM/YYY</td>
                        <td>0</td>
                        <td> Depature ---- Arrival </td>
                        <td>DD/MM/YYYY</td>
                    </tr>
                    <tr>
                        <td>00002</td>
                        <td>DD/MM/YYY</td>
                        <td>0</td>
                        <td> Depature ---- Arrival </td>
                        <td>DD/MM/YYYY</td>
                    </tr>
                    <tr>
                        <td>00003</td>
                        <td>DD/MM/YYY</td>
                        <td>0</td>
                        <td> Depature ---- Arrival </td>
                        <td>DD/MM/YYYY</td>
                    </tr>
                    <tr>
                        <td>00004</td>
                        <td>DD/MM/YYY</td>
                        <td>0</td>
                        <td> Depature ---- Arrival </td>
                        <td>DD/MM/YYYY</td>
                    </tr>
                    <tr>
                        <td>00005</td>
                        <td>DD/MM/YYY</td>
                        <td>0</td>
                        <td> Depature ---- Arrival </td>
                        <td>DD/MM/YYYY</td>
                    </tr>
                    <tr>
                        <td>00006</td>
                        <td>DD/MM/YYY</td>
                        <td>0</td>
                        <td> Depature ---- Arrival </td>
                        <td>DD/MM/YYYY</td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default ProfileTicket