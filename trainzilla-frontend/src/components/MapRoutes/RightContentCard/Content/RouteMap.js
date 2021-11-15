import React, {useEffect, useRef, useState} from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import networkgraph from 'highcharts/modules/networkgraph'

require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);

if (typeof Highcharts === "object") {
    networkgraph(Highcharts);
}

const RouteMap = ({mapRouteData}) => {

    const [seriesData, setSeriesData] = useState(mapRouteData.data);
    const [centralStation, setCentralStation] = useState(mapRouteData.centralStation);
    const [allStation, setAllStation] = useState(mapRouteData.allStation);

    useEffect(() => {
        setSeriesData(mapRouteData.data);
        setCentralStation(mapRouteData.centralStation);
        setAllStation(mapRouteData.allStation);
    }, [mapRouteData])

    Highcharts.addEvent(
        Highcharts.Series,
        'afterSetOptions',
        function (e) {
            let colors = Highcharts.getOptions().colors,
                i = 0,
                nodes = {};

            if (
                this instanceof Highcharts.seriesTypes.networkgraph &&
                e.options.id === 'lang-tree' &&
                e.options.data !== undefined
            ) {
                let lastSecond = '', arry = []
                e.options.data.forEach(function (link) {

                    if (lastSecond !== link[0]) {
                        nodes[link[0]] = {
                            id: link[0],
                            color: colors[++i]
                        }
                    } else if (lastSecond === link[0]) {
                        nodes[link[0]] = {
                            id: link[0],
                            color: colors[i]
                        }
                        nodes[link[1]] = {
                            id: link[1],
                            color: colors[i]
                        }
                        arry.push(link[0])
                    }
                    lastSecond = link[1];

                });

                const exchangeStation = allStation.filter((item, index) => allStation.indexOf(item) !== index);
                i += 1;
                exchangeStation.forEach((station) => {
                    nodes[station] = {
                        id: station,
                        marker: {
                            radius: 18
                        },
                        name: 'Interchange: ' + station,
                        color: colors[i]
                    }
                })

                nodes[centralStation] = {
                    id: centralStation,
                    name: 'Sentral Station: ' + centralStation,
                    marker: {
                        radius: 25
                    },
                    color: colors[++i]
                }


                e.options.nodes = Object.keys(nodes).map(function (id) {
                    return nodes[id];
                });

            }
        }
    );

    const options = {
        chart: {
            type: 'networkgraph',
        },
        title: {
            text: 'The Route Map'
        },
        caption: {
            text: "Click the button at top right for more options."
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            networkgraph: {
                keys: ['from', 'to'],
                layoutAlgorithm: {
                    enableSimulation: true,
                    // linkLength: 7
                }
            }
        },
        series: [
            {
                link: {
                    width: 4,
                },
                marker: {
                    radius: 10
                },
                dataLabels: {
                    enabled: true,
                    linkFormat: "",
                    allowOverlap: false
                },
                id: "lang-tree",
                data: seriesData
            }
        ]
    };

    return <HighchartsReact
        ref={useRef()}
        containerProps={{style: {height: "100%", width: "100%"}}}
        highcharts={Highcharts}
        options={options}
    />;
}

export default RouteMap;