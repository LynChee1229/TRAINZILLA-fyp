<<<<<<< HEAD
import React, {useState} from 'react'
import '../../styles/css/profile-user.sass'
import '../../styles/css/announcement.sass';
import Header from "../Header/Header";
import Footer from '../Footer/Footer';
import ProfileInfo from './ProfileInfo';
import $ from 'jquery'


const Profile = () => {

    $(document).on('click', '#infoBtn', function() {
        $(this).addClass('actList');
        $(this).removeClass('inactList');
        $('#ticketBtn').addClass('inactList');
        $('#ticketBtn').removeClass('actList');
        $('#infoComponent').removeClass('d-none');
        $('#ticketComponent').addClass('d-none');
    });

    $(document).on('click', '#ticketBtn', function() {
        $(this).addClass('actList');
        $(this).removeClass('inactList');
        $('#infoBtn').addClass('inactList');
        $('#infoBtn').removeClass('actList');
        $('#ticketComponent').removeClass('d-none');
        $('#infoComponent').addClass('d-none');
    });
    

    return (
        <div>
            <Header />
            <div id="profileOuter">
                <div id="profileBG">
                    <button className="btn tabBtn actList" id="infoBtn">
                        User Information
                    </button>
                    <button className="btn tabBtn inactList" id="ticketBtn">
                        Tickets & Vouchers
                    </button>

                    <ProfileInfo/>

                    <Footer />
                </div>
            </div>
        </div>
    )
}

=======
import React , { Component } from 'react';
import Header from '../Header/Header';
import Footer from "../Footer/Footer";
import '../../styles/css/profile.sass';
import ProfileUser from './ProfileUser';
import ProfileTicket from './ProfileTicket';
import $ from 'jquery';
import { Paper } from '@mui/material';

class Profile extends Component {
    componentDidMount(){
        $(document).on('click', '#aButton', function() {
            $(this).addClass('actList');
            $(this).removeClass('inactList');
            $('#rButton').addClass('inactList');
            $('#rButton').removeClass('actList');
            $('#ProfileUserComponent').removeClass('d-none');
            $('#ProfileTicketComponent').addClass('d-none');
        });

        $(document).on('click', '#rButton', function() {
            $(this).addClass('actList');
            $(this).removeClass('inactList');
            $('#aButton').addClass('inactList');
            $('#aButton').removeClass('actList');
            $('#ProfileUserComponent').removeClass('d-none');
            $('#ProfileTicketComponent').addClass('d-none');
        });
    }
    render(){
        return (
            <Paper>
                <Header/>
                <div id="listOuter">
                    <div id="listBG">
                        <button className="btn tabBtn actList" id="aButton">
                            User Information
                        </button>
                        <button className="btn tabBtn inactList" id="rButton">
                            Ticket & Voucher
                        </button>
                        <ProfileUser/>
                        <ProfileTicket />
                    </div>
                </div>
                <Footer/>
            </Paper>
        )
    }
}
>>>>>>> 1363b022a4880997e8d97b2c630392e2f186b671
export default Profile