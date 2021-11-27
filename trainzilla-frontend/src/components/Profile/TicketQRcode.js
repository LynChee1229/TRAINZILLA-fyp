import QRCode from "qrcode";
import { useEffect , useState } from "react";
import '../../styles/css/profile_ticket.sass'

const TicketQRcode = ({ticket}) => {

    const [src, setSrc] = useState('');

    useEffect(() => {
        QRCode.toDataURL(ticket).then((setSrc));
    }, []);

    return(
        <div className="qrModal">
            <img className="qrImg" src={src} alt={ticket}/>
        </div>
    )
}

export default TicketQRcode