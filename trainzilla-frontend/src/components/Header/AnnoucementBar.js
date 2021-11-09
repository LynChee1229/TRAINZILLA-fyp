import React, {useState, useEffect} from 'react';
import { Carousel } from 'react-bootstrap';
import '../../styles/css/homepage.sass'

const AnnouncementBar = () => {
    const [index, setIndex] = useState(0);
    const [data, setData] = useState([]);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    useEffect(()=> {
        async function getList() {
            let res = await fetch('http://localhost:8000/api/announcementBar');
            res = await res.json();
            setData(res);
        }
        getList();
    }, []);

    if(data.length > 0) {
        return (
            <div className="announcementBar">
            <Carousel 
                activeIndex={index} 
                onSelect={handleSelect} 
                autoPlay={true} 
                interval={2900} 
                indicators={false}
            >
                {
                    data.map((item) => {
                        var dot = "";
                        var ttl;
                        if(window.innerWidth > 1000) {
                            ttl = 85 - item.reportTitle.length;
                        } else if(window.innerWidth > 420){
                            ttl = 50 - item.reportTitle.length;
                        } else {
                            item.reportTitle = item.reportTitle.substring(0, 29);
                            ttl = 0;
                        }

                        if(item.reportDetails.length >= ttl) {
                            dot = "...";
                        }
                        return  <Carousel.Item>
                                    <a href="/announcements" >
                                        <span className="aRT mr-5">{item.reportTitle} : </span>
                                        {item.reportDetails.substring(0, ttl)} {dot} 
                                        <span style={{marginLeft:'12px' , color:"#99CCFF"}}><em><small> (view more)</small></em></span>
                                    </a>
                                </Carousel.Item>
                    })
                }
            </Carousel>
            </div>
        );
    }

    return (
        ""
    );
};

export default AnnouncementBar;
