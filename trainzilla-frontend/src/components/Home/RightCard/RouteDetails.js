import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import {useEffect, useRef, useState} from "react";
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import timeline from 'highcharts/modules/timeline'


if (typeof Highcharts === "object") {
    timeline(Highcharts);
}

export default function RouteDetails({openDialog, setOpenDialog, routes}) {

    const [suggestionRoute, setSuggestionRoute] = useState([]);

    const handleClose = () => {
        setOpenDialog(false)
    };

    useEffect(() => {
        console.log(routes)


    }, [routes]);
    

    const [options, setOptions] = useState({
        chart: {
            zoomType: 'x',
            type: 'timeline',
            inverted: true
        },
        xAxis: {
            type: 'datetime',
            visible: false
        },
        yAxis: {
            gridLineWidth: 1,
            title: null,
            labels: {
                enabled: false
            }
        },
        exporting:{
            buttons: {
                contextButton: {
                    menuItems: ["viewFullscreen", "separator", 'downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG'],
                },
            },
        },
        legend: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        title: {
            text: null
        },
        tooltip: {
            style: {
                width: 300
            }
        },
        series: [{
            dataLabels: {
                allowOverlap: false,
                format: '<span style="color:{point.color}">● </span><span style="font-weight: bold;" > ' +
                    '{point.x:%d %b %Y}</span><br/>{point.label}'
            },
            marker: {
                symbol: 'circle'
            },
            data: [{
                x: Date.UTC(1951, 5, 22),
                name: 'First dogs in space',
                label: 'F',
            }, {
                x: Date.UTC(1957, 9, 4),
                name: 'First artificial satellite',
                label: 'First artificial satellite',
                description: "Sputnik 1 was the first artificial Earth satellite. The Soviet Union launched it into an elliptical low Earth orbit on 4 October 1957, orbiting for three weeks before its batteries died, then silently for two more months before falling back into the atmosphere."
            }, {
                x: Date.UTC(1959, 0, 4),
                name: 'First artificial satellite to reach the Moon',
                label: 'First artificial satellite to reach the Moon',
                description: "Luna 1 was the first artificial satellite to reach the Moon vicinity and first artificial satellite in heliocentric orbit."
            }, {
                x: Date.UTC(1961, 3, 12),
                name: 'First human spaceflight',
                label: 'First human spaceflight',
                description: "Yuri Gagarin was a Soviet pilot and cosmonaut. He became the first human to journey into outer space when his Vostok spacecraft completed one orbit of the Earth on 12 April 1961."
            }, {
                x: Date.UTC(1966, 1, 3),
                name: 'First soft landing on the Moon',
                label: 'First soft landing on the Moon',
                description: "Yuri Gagarin was a Soviet pilot and cosmonaut. He became the first human to journey into outer space when his Vostok spacecraft completed one orbit of the Earth on 12 April 1961."
            }]
        }]
    });


    return (

        <Dialog
            fullWidth={true}
            maxWidth={"md"}
            open={openDialog}
            onClose={handleClose}
            className="default-font"
        >
            <DialogTitle className="blueFont bold center">Route Review</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <HighchartsReact
                        ref={useRef()}
                        containerProps={{style: {height: "100%", width: "100%"}}}
                        highcharts={Highcharts}
                        options={options}
                        imutable={false}
                        allowChartUpdate={false}
                    />
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>

    );
}

