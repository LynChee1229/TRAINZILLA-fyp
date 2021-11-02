import Header from '../Header/Header'
import Footer from "../Footer/Footer";
import logoDark from '../../styles/Images/darkLogo.png'
import dinaPic from '../../styles/Images/Personal/dina.jpg'
import lynPic from '../../styles/Images/Personal/lyn.jpg'
import kingsleyPic from '../../styles/Images/Personal/kingsley.jpg'
import supervisor from '../../styles/Images/Personal/supervisor.jpg'
import * as Icon from 'react-bootstrap-icons'
import $ from 'jquery'
import {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import '../../styles/css/about_us.sass'
import '../../styles/Font/fonts.sass'
import {Paper} from "@mui/material";

class AboutUs extends Component {
    componentDidMount() {
        $(document).ready(function () {
            $('.cDesc').hover(
                function () {
                    $(this).css('font-weight', 'bold')
                    $(this).find('.desc').css('opacity', '1')
                },
                function () {
                    $(this).css('font-weight', 'normal')
                    $(this).find('.desc').css('opacity', '0')
                }
            )
        })
    }

    render() {
        return (
            <Paper id="paper" >
                <Header/>
                <div id="aboutUsBG" className="default-font">
                    <div className="display-3 centerFont" id="ourTeam">
                        Our Mission
                    </div>
                    <div className="centerFont">
                        <img className="img" src={logoDark} alt="logo"/>
                    </div>
                    <div className="bold blueFont centerFont bigTitle">
                        Make you life more convenient
                    </div>
                    <div className="centerFont" id="desc">
                        Today more than ever before, people rely on various
                        means of rapid transportation to accommodate their busy
                        lives. The living standards of people around the world
                        radically have increased when transportation becomes{' '}
                        <strong>
                            easier, safer, faster, more reliable and convenient
                        </strong>
                        .
                    </div>
                    <a href="#theTeam" className="centerFont" style={{textDecoration: 'none'}}>
                        <div
                            id="meetDirection"
                            style={{
                                fontSize: '1.6em',
                                margin: '77px 0px',
                                color: 'black',
                            }}
                        >
                            MEET THE TEAM <Icon.ChevronDown/>
                        </div>
                    </a>
                    <div id="theTeam">THE TEAM</div>
                    <div className="teamPic">
                        <div className="centerFont flexDisplay" style={{paddingTop: '5%'}}>

                            <div className="cDesc ">
                                <img src={lynPic} alt="lyn"/>
                                <div>
                                    CHAN LIN CHEE (Lyn) <br/> 1191202546 <br/>{' '}
                                    clynchee.z@gmail.com{' '}
                                </div>
                                <div className="desc" style={{opacity: '0'}}>
                                    <br/>
                                    <em>
                                        "The greatest part of a road trip isn't
                                        arriving at your destination. It’s all
                                        the wild stuff that happens along the
                                        way."
                                    </em>
                                </div>
                            </div>
                            <div className="cDesc">
                                <img src={kingsleyPic} alt="kingsley"/>
                                <div>
                                    YONG JING PING (Kingsley) <br/> 1191202279{' '}
                                    <br/> kingsleyong0208@gmail.com{' '}
                                </div>
                                <div className="desc" style={{opacity: '0'}}>
                                    <br/>
                                    <em>
                                        "Roads were made for journeys, not for
                                        destinations."
                                    </em>
                                </div>
                            </div>
                            <div className="cDesc">
                                <img src={dinaPic} alt="dina"/>
                                <div>
                                    IRDINA BINTI AHMAD HILMI (Dina) <br/>{' '}
                                    1191200368 <br/> irdinahmdhlmi422@gmail.com{' '}
                                </div>
                                <div className="desc" style={{opacity: '0'}}>
                                    <br/>
                                    <em>
                                        "Stop worrying about the potholes in the
                                        road and enjoy the journey."
                                    </em>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="thanksTT centerFont">
                            {' '}
                            · especially thanks to ·
                        </div>
                        <div
                            className="p-4 row align-items-center"
                            style={{
                                fontSize: '1.2em',
                                maxWidth: '460px',
                                margin: 'auto',
                            }}
                        >
                            <div className="col">
                                <img
                                    src={supervisor}
                                    alt="ms suraya"
                                    class="mdmPic"
                                />
                            </div>
                            <div className="col">
                                <strong>
                                    Ms. Suraya <br/> Nurain Binti Kalid
                                </strong>
                            </div>
                        </div>
                        <div
                            className="px-4 centerFont"
                            style={{
                                maxWidth: '520px',
                                margin: 'auto',
                                paddingBottom: '85px',
                            }}
                        >
                            "We are very grateful for your time to guide us, and
                            all your efforts to help us improve. We will never
                            forget your support and kindness. Thank you, Ms.
                            Suraya!" - Trainzilla Develop Team
                        </div>
                    </div>
                </div>
                <Footer />
            </Paper>
        )
    }
}

export default AboutUs