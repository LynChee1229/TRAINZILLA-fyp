// import React from 'react'
// import Highcharts from 'highcharts'
// import networkgraph from 'highcharts/modules/networkgraph'
// import HighchartsReact from 'highcharts-react-official'

// if (typeof Highcharts === "object") {
//     networkgraph(Highcharts);
// }

// const RouteMap = () => {

//     Highcharts.addEvent(
//         Highcharts.Series,
//         'afterSetOptions',
//         function (e) {
//             let colors = Highcharts.getOptions().colors,
//                 i = 0,
//                 nodes = {};
    
//             if (
//                 this instanceof Highcharts.seriesTypes.networkgraph &&
//                 e.options.id === 'lang-tree'
//             ) {
//                 e.options.data.forEach(function (link) {
    
//                     if (link[0] === 'Proto Indo-European') {
//                         nodes['Proto Indo-European'] = {
//                             id: 'Proto Indo-European',
//                             marker: {
//                                 radius: 20
//                             }
//                         };
//                         nodes[link[1]] = {
//                             id: link[1],
//                             marker: {
//                                 radius: 10
//                             },
//                             color: colors[i++]
//                         };
//                     } else if (nodes[link[0]] && nodes[link[0]].color) {
//                         nodes[link[1]] = {
//                             id: link[1],
//                             color: nodes[link[0]].color
//                         };
//                     }
//                 });
    
//                 e.options.nodes = Object.keys(nodes).map(function (id) {
//                     return nodes[id];
//                 });
//             }
//         }
//     );

//     const options = {
//         chart: {
//             type: 'networkgraph',
//             height: '100%'
//         },
//         title: {
//             text: 'T'
//         },

//         plotOptions: {
//             networkgraph: {
//                 keys: ['from', 'to'],
//                 layoutAlgorithm: {
//                     enableSimulation: true,
//                     friction: -0.9
//                 }
//             }
//         },

//         series: [
//             {
//                 events: {
//                     click: (e) => {
//                         this.onClick(e);
//                     }
//                 },
//                 marker: {
//                     radius: 10
//                 },
//                 dataLabels: {
//                     enabled: true,
//                     linkFormat: "",
//                     allowOverlap: true
//                 },
//                 id: 'lang-tree',
//                 data: [


//                     // Leaves:
//                     ['Proto Indo-European', 'Indo-Iranian'],
//                     ['Proto Indo-European', 'Phrygian'],
//                     ['Proto Indo-European', 'Armenian'],
//                     ['Proto Indo-European', 'Albanian'],
//                     ['Proto Indo-European', 'Thracian'],
//                     ['Phrygian', 'Balochi'],
//                     ['Armenian', 'Kurdish'],
//                     ['Albanian', 'Pashto'],
//                     ['Thracian', 'Sogdian'],

//                 ]
//             }
//         ]
//     }

//     return (
//         <HighchartsReact
//             highcharts={Highcharts}
//             // constructorType={'mapChart'}
//             options={options}
//         />
//     )
// }

// export default RouteMap;