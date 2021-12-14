import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material';
import {useEffect, useRef, useState} from "react";
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import timeline from 'highcharts/modules/timeline'
import dayjs from 'dayjs';
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import _ from 'lodash';

dayjs.extend(LocalizedFormat);

if (typeof Highcharts === "object") {
    timeline(Highcharts);
}

export default function RouteDetails({openDialog, setOpenDialog, routes, path}) {

    const [options, setOptions] = useState({
        chart: {
            zoomType: 'x',
            type: 'timeline',
            inverted: true,
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
        if (!_.isEmpty(routes)){
            let arr = [], timestamp = dayjs().valueOf();
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
                    sourceWidth: 2800,
                    sourceHeight: 1900,
                    filename: path + "'s Route Review " + dayjs().format('LLL').toString(),
                    buttons: {
                        contextButton: {
                            menuItems: ["viewFullscreen", "separator", 'downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG'],
                        },
                    },
                    chartOptions: {
                        caption: null
                    }
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
                caption: {
                    text: 'Please click and drag for zooming the chart.'
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
        }

    }, [path, routes]);


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
                <HighchartsReact
                    ref={useRef()}
                    containerProps={{style: {height: "100%", width: "100%"}}}
                    highcharts={Highcharts}
                    options={options}
                    imutable={false}
                    allowChartUpdate={false}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>

    );
}

