import logoDark from '../../styles/Images/darkLogo.png'
import {Component} from 'react'
import '../../styles/css/footer.sass'
import '../../styles/Font/fonts.sass'

// import $ from 'jquery'

class Footer extends Component {
    // componentDidMount() {
    //     $(document).ready(function() {
    //         $("img").click(function(){
    //             $(window).scrollTop(0);
    //         });
    //     });
    // }

    render() {
        return (
            <div className="background fontType">
                <div className="center">
                    <img src={logoDark} alt="logo" className="img" />
                </div>
                <div className="center">
                    Developed by MMU diploma students, as a final year project.
                </div>
                <div className="center">TRAINZILLA &copy; 2021</div>
                <div className="center">
                    Feel free to contact us via customerservice@trainzilla.com .
                </div>
            </div>
        )
    }
}

export default Footer
