import React, {Component} from 'react';
import '../../styles/css/announcement.sass';
import Header from '../Header/Header';
import Footer from "../Footer/Footer";
import AnnouncementList from './AnnouncementList';
import RuleList from './RuleList';
import $ from 'jquery';
import {Paper} from "@mui/material";

class Announcement extends Component {
    componentDidMount() {
        $(document).on('click', '#aButton', function() {
            $(this).addClass('actList');
            $(this).removeClass('inactList');
            $('#rButton').addClass('inactList');
            $('#rButton').removeClass('actList');
            $('#announceComponent').removeClass('d-none');
            $('#ruleComponent').addClass('d-none');
        });

        $(document).on('click', '#rButton', function() {
            $(this).addClass('actList');
            $(this).removeClass('inactList');
            $('#aButton').addClass('inactList');
            $('#aButton').removeClass('actList');
            $('#ruleComponent').removeClass('d-none');
            $('#announceComponent').addClass('d-none');
        });
    }

    render() {
        return (
            <Paper>
                <Header/>
                <div id="listOuter">
                    <div id="listBG">
                        <button className="btn tabBtn actList" id="aButton">
                            Train Updates
                        </button>
                        <button className="btn tabBtn inactList" id="rButton">
                            Rules & Regulations
                        </button>
                        <AnnouncementList />
                        <RuleList />
                        <Footer />
                    </div>
                </div>
            </Paper>
        )
    }
}

export default Announcement