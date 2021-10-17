import logoDark from './img/logo-dark.png'
import { Component } from 'react'
import $ from 'jquery'

class Footer extends Component {
    componentDidMount() {
        $(document).ready(function() {
            $("img").click(function(){
                $(window).scrollTop(0);
            });
        });
    }

    render() 
    {
        return (
            <div style={{ backgroundColor:"#E2EFFF", paddingTop:"29px"}}>
                <div style={{ margin:0 }}>
                    <img src={logoDark} alt="logo" style={{ height:"58px" }}/>
                    <div className="p-2">Developed by MMU diploma students, as a final year project.</div>
                    <div>TRAINZILLA &copy; 2021</div>
                    <div style={{ paddingBottom:"12px" }}>Feel free to contact us via customerservice@trainzilla.com .</div>
                </div>
            </div>
        )
    }
    
}

export default Footer