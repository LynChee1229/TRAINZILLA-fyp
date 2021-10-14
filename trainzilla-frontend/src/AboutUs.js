import logoDark from './img/logo-dark.png'
import dinaPic from './img/dina.JPG'
import lynPic from './img/lyn.JPG'
import kingsleyPic from './img/kingsley.JPG'
import supervisor from './img/supervisor.jpg'
import * as Icon from 'react-bootstrap-icons'
import $ from 'jquery'
import { Component } from 'react'

class AboutUs extends Component {
    componentDidMount() {
        $(document).ready(function() {
            $(".cDesc").hover(function(){
                $(this).css("font-weight", "bold");
                $(this).find(".desc").css("opacity", "1");
            },
            function(){
                $(this).css("font-weight", "normal");
                $(this).find(".desc").css("opacity", "0");
            });
        });
    }

    render()
    {
        return (
            <div style={{ backgroundImage: "url(/img/aboutusBG.png)", minHeight:"1580px" }} id="aboutUsBG">
                <div>
                    <div className="display-3" style={{ padding:"2% 0 1% 0", letterSpacing:"0.3em" }}>Our Mission</div>
                    <p style={{ margin:0 }}><img src={logoDark} alt="logo" style={{ height:"92px" }}/></p>
                    <div id="slogan">Make you life more convenient</div>
                    <div style={{ width:"80%", margin:"auto", marginTop:"24px", fontSize:"1.20em", lineHeight:"200%" }}>
                        Today more than ever before, people rely on various means of rapid transportation to accommodate their busy lives. The living standards of people around the world radically have increased when transportation becomes <strong>easier, safer, faster, more reliable and convenient</strong>.
                    </div>
                    <a href="#theTeam" style={{ textDecoration:"none" }}><div id="meetDirection" style={{ fontSize:"1.6em", margin:"77px 0px", color:"black" }}>MEET THE TEAM <Icon.ChevronDown /></div></a>
                    <div id="theTeam">THE TEAM</div>
                    <div class="container teamPic">
                        <div class="row" style={{ paddingTop:"5%" }}>
                            <div class="col-md cDesc py-3">
                                <img src={lynPic} alt="lyn"/>
                                <div>CHAN LIN CHEE (Lyn) <br/> 1191202546 <br/> clynchee.z@gmail.com </div>
                                <div class="desc" style={{ opacity:"0" }} >
                                    <br/><em>"The greatest part of a road trip isn't arriving at your destination. It’s all the wild stuff that happens along the way."</em>
                                </div>
                            </div>
                            <div class="col-md cDesc py-3">
                                <img src={kingsleyPic} alt="kingsley"/>
                                <div>YONG JING PING (Kingsley) <br/> 1191202279 <br/> kingsleyong0208@gmail.com </div>
                                <div class="desc" style={{ opacity:"0" }} >
                                    <br/><em>"Roads were made for journeys, not for destinations."</em>
                                </div>
                            </div>
                            <div class="col-md cDesc py-3">
                                <img src={dinaPic} alt="dina"/>
                                <div>IRDINA BINTI AHMAD HILMI (Dina) <br/> 1191200368 <br/> irdinahmdhlmi422@gmail.com </div>
                                <div class="desc" style={{ opacity:"0" }} >
                                    <br/><em>"Stop worrying about the potholes in the road and enjoy the journey."</em>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="thanksTT"> · · · especially thanks to · · · </div>
                        <div className="p-4" style={{ fontSize:"1.2em" }}>
                            <img src={supervisor} alt="ms suraya" class="mdmPic mx-2"/> <strong>Ms. Suraya Nurain Binti Kalid</strong>
                        </div>
                        <div style={{ width:"480px", margin:"auto", paddingBottom:"85px" }}>"We are very grateful for your time to guide us, and all your efforts to help us improve. We will never forget your support and kindness. Thank you, Ms. Suraya!" - Trainzilla Develop Team</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AboutUs