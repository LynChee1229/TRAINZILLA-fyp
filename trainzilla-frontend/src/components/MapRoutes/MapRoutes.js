import '../../styles/css/mapRoute.sass';
import Header from '../Header/Header'
import {Container, Paper} from "@mui/material";
import NavCard from "./LeftNavCard/NavCard";
import Footer from "../Footer/Footer";
import React, {useState} from "react";
import RightContent from "./RightContentCard/RightContent";

function MapRoute() {
    const [content, setContent] = useState('map');

    const rightContentCallback = (key) => {
        setContent(key);
    }

    return (
        <Paper className="bgImg">
            <Header/>
            <Container className="box center" maxWidth="xl">

                <NavCard rightContent={rightContentCallback}/>

                <RightContent contentKey={content} />

            </Container>
            <Footer/>
        </Paper>
    )
}

export default MapRoute;