import '../../styles/css/mapRoute.sass';
import Header from '../Header/Header'
import {Box, Container, Paper} from "@mui/material";
import NavCard from "./LeftNavCard/NavCard";
import Footer from "../Footer/Footer";
import React, {useState} from "react";
import RightContent from "./RightContentCard/RightContent";

// function MapChoice(props)
// {
//   return {props,mapIMG}
// }

function MapRoute() {
    const [content, setContent] = useState('map');
    // const maps = [
    //     {id: 1, mapIMG: <img src={transit} alt="transit map"/>},
    //     {id: 2, mapIMG: <img src={kelana} alt="transit map"/>},
    //     {id: 3, mapIMG: <img src={sungai} alt="transit map"/>},
    //     {id: 4, mapIMG: <img src={port} alt="transit map"/>},
    //     {id: 5, mapIMG: <img src={seremban} alt="transit map"/>}
    // ];
    //
    // const showImg =
    //     maps.map((map) =>
    //             // <MapChoice key={map.id} mapIMG={map.mapIMG}/>
    //         {
    //             return map.mapIMG;
    //         }
    //     )

    const rightContentCallback = (key) => {
        setContent(key);
    }

    return (
        <Paper className="bgImg">
            <Header/>
            <Container className="flex box" maxWidth="xl">

                <NavCard rightContent={rightContentCallback}/>

                <RightContent contentKey={content}/>
            </Container>
            <Footer/>
        </Paper>
    )
}

export default MapRoute;