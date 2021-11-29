import {Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import {useEffect, useRef, useState} from "react";
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import timeline from 'highcharts/modules/timeline'
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Australia/Sydney');

if (typeof Highcharts === "object") {
    timeline(Highcharts);
}

export default function RouteDetails({openDialog, setOpenDialog, routes}) {

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
                    '{point.x: %l:%M %p}</span><br/>{point.label}'
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
        console.log(routes)
        let arr = [], timestamp = dayjs().valueOf();
        // setSuggestionRoute(routes.suggestRoute)
        routes.suggestRoute.forEach(suggestion => {
            arr.push({
                x: timestamp + 28800000, //28800000 is local timezone (GMT +08:00)
                name: suggestion.routeTitle,
                label: suggestion.stationName
            });
            timestamp += Math.random() * (600000 - 600) + 600
        })

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
                        '{point.x: %l:%M %p}</span><br/>{point.label}'
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
                    <Box className="default-font centerFont greyFont title" style={{padding: '0', paddingTop: '1.5vw'}}>
                        Route Distance: {routes.distance} km
                    </Box>
                    <Box className="default-font centerFont greyFont title" style={{padding: '0'}}>
                        {() => {
                            let hour = dayjs(routes.timeTaken).format("h"),
                                minute = dayjs(routes.timeTaken).format("m"),
                                sec = dayjs(routes.timeTaken).format("s");

                            return hour +' '+ minute +' '+ sec;
                        }}
                    </Box>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>

    );
}

