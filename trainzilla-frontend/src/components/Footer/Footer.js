import logoDark from '../../styles/Images/darkLogo.png'
import {Component} from 'react'
import '../../styles/css/footer.sass'

import $ from 'jquery'

class Footer extends Component {
    componentDidMount() {
        $(document).ready(function() {
            $(".footerimg").click(function(){
                $(window).scrollTop(0);
            });
        });
    }

    render() {
        return (
            <div className="background">
                <div>
                    <img src={logoDark} alt="logo" className="footerimg" />
                </div>
                <div>
                    Developed by MMU diploma students, as a final year project.
                </div>
                <div id="cr">TRAINZILLA &copy; 2021</div>
                <div>
                    Feel free to contact us via customerservice@trainzilla.com .
                </div>
            </div>
        )
    }
}

export default Footer
