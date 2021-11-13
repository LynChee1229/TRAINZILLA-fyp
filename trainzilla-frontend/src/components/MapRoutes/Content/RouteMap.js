import React, {useRef} from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import networkgraph from 'highcharts/modules/networkgraph'
import InterchangePic from '../../../styles/Images/interchange.png'

require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);

if (typeof Highcharts === "object") {
    networkgraph(Highcharts);
}

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

                if (lastSecond !== link [0]) {
                    nodes[link[0]] = {
                        id: link[0],
                        color: colors[++i]
                    }
                } else if (lastSecond === link [0]) {
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

            const exchangeStation = arry.filter((item, index) => arry.indexOf(item) !== index)
            exchangeStation.forEach((station) =>{
                nodes[station] = {
                    id: station,
                    marker:{
                        radius: 20
                    },
                    name: 'Interchange: ' + station
                }
            })

            e.options.nodes = Object.keys(nodes).map(function (id) {
                return nodes[id];
            });

        }
    }
);

const RouteMap = ({mapRouteData}) => {

    const options = {
        chart: {
            type: 'networkgraph',
            height: '100%',
        },
        title: {
            text: 'The Route Map'
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
                data: mapRouteData.data
            }
        ]
    };

    return <HighchartsReact
        ref={useRef()}
        highcharts={Highcharts}
        allowChartUpdate={false}
        immutable={false}
        options={options}
    />;
}

export default RouteMap;