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
export default Profile