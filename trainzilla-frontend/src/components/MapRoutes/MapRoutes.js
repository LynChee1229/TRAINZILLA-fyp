import '../../styles/css/mapRoute.sass';
import Header from '../Header/Header'
import transit from '../../styles/Images/transit map.jpg';
import kelana from '../../styles/Images/kelana-jaya.png';
import port from '../../styles/Images/port.png';
import sungai from '../../styles/Images/sungai.png';
import seremban from '../../styles/Images/seremban.png';

// function MapChoice(props)
// {
//   return {props,mapIMG}
// }

function mapRoute() {
    const maps = [
        {id: 1, mapIMG: <img src={transit} alt="transit map"/>},
        {id: 2, mapIMG: <img src={kelana} alt="transit map"/>},
        {id: 3, mapIMG: <img src={sungai} alt="transit map"/>},
        {id: 4, mapIMG: <img src={port} alt="transit map"/>},
        {id: 5, mapIMG: <img src={seremban} alt="transit map"/>}
    ];

    const showImg =
        maps.map((map) =>
                // <MapChoice key={map.id} mapIMG={map.mapIMG}/>
            {
                return map.mapIMG;
            }
        )
    return (
        <div>
            <Header />
            <div class="box">
                <div class="left">
                    <a onclick="choice()"><p class="mainLine"><strong>Transit Map</strong></p></a>
                    <p class="titleLine">Time table</p>
                    <a onclick="choice()"><p class="lines"><strong>Kelana Jaya Line</strong></p></a>
                    <a onclick="choice()"><p class="lines"><strong>Sungai Buloh Line</strong></p></a>
                    <a onclick="choice()"><p class="lines"><strong>Port Klang Line</strong></p></a>
                    <a onclick="choice()"><p class="lines"><strong>Seremban Line</strong></p></a>
                </div>

                <div class="right">

                    {showImg}
                    {/*<img src={map} alt="transit map"/>*/}
                </div>
            </div>
        </div>
    )
}

export default mapRoute;