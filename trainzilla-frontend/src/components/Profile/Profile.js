import React , { useEffect , useState } from 'react'
import { useLocation } from "react-router-dom";
import '../../styles/css/profile.sass'
import '../../styles/css/announcement.sass';
import Header from "../Header/Header";
import Footer from '../Footer/Footer';
import ProfileInfo from './ProfileInfo';
import ProfileTicket from './ProfileTicket';
import $ from 'jquery'


const Profile = () => {
    const location = useLocation()
    const [tuc, setTUC] = useState([]);

    useEffect(() => {
        if( location.state  &&  location.state.tab == "ticket" ) {
            setTUC(location.state.ticketUC);
            $('#ticketBtn').click();
        }
    }, [ location ]);

    $(document).on('click', '#infoBtn', function () {
        $(this).addClass('actList');
        $(this).removeClass('inactList');
        $('#ticketBtn').addClass('inactList');
        $('#ticketBtn').removeClass('actList');
        $('#infoComponent').removeClass('d-none');
        $('#ticketComponent').addClass('d-none');
    });

    $(document).on('click', '#ticketBtn', function () {
        $(this).addClass('actList');
        $(this).removeClass('inactList');
        $('#infoBtn').addClass('inactList');
        $('#infoBtn').removeClass('actList');
        $('#ticketComponent').removeClass('d-none');
        $('#infoComponent').addClass('d-none');
    });


    return (
        <div>
            <Header/>
            <div id="profileOuter">
                <div id="profileBG">
                    <button className="btn tabBtn actList" id="infoBtn">
                        User Information
                    </button>
                    <button className="btn tabBtn inactList" id="ticketBtn">
                        Tickets & Vouchers
                    </button>

                    <ProfileInfo/>
                    <ProfileTicket newTicket={tuc}/>
                    <Footer/>
                </div>
            </div>
        </div>
    )
}

export default Profile