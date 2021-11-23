import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import {useEffect, useRef, useState} from "react";
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import timeline from 'highcharts/modules/timeline'
import dayjs from "dayjs";


if (typeof Highcharts === "object") {
    timeline(Highcharts);
}

export default function RouteDetails({openDialog, setOpenDialog, routes}) {

    const [suggestionRoute, setSuggestionRoute] = useState([]);
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
        exporting: {
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
            data: []
        }]
    });

    const handleClose = () => {
        setOpenDialog(false)
    };

    useEffect(() => {
        let arr = [], timestamp = dayjs().valueOf();
        setSuggestionRoute(routes.suggestRoute)
        routes.suggestRoute.forEach(suggestion => {
            arr.push({
                x: timestamp,
                name: suggestion.routeTitle,
                label: suggestion.stationName
            });
            timestamp += Math.random() * (600000 - 600) + 600
        })
        console.log(arr)
        setOptions({
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
            exporting: {
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
                data: arr
            }]
        })
    }, [routes]);


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

