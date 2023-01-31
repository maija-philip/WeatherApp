/*
 Author: Maija Philip
 Date: 12-12-2022

 Chart based off of https://codesandbox.io/s/jakariaemon-react-chart-victory-chkqkn?file=/src/App.js:630-654
 */


 import React from 'react';
 import { useState } from 'react'; 
 import { VictoryPie } from "victory-pie";
 import { VictoryChart } from "victory-chart";
 import { VictoryTooltip } from "victory-tooltip";
import { VictoryLabel } from 'victory';
 // import ReactDOM from 'react-dom/client';
 // import Weather from './get-weather.js';

 /*
 Needs the Props:
    percentage: needs to be a value under 100
    color: string of hex value

 */
 function Donut(props) {

    const [data3, setData3] = useState([
        { x: " ", y: props.percentage },
        { x: " ", y: props.total - props.percentage }
      ]);
    
    const [label, setLabel] = useState(false);

    // get theme colors
    let root = document.querySelector(':root');
    root = getComputedStyle(root);
    const theme = root.getPropertyValue('--theme-dark');
    const white = root.getPropertyValue('--white');
    
    return (
        <VictoryPie
            padAngle={({ datum }) => 2}
            animate={{
                duration: 2000
            }}
            innerRadius={(val) => {
                //console.log(val.datum);
                return val.datum.x === "firefox" ? 170 : 130;
            }}
            width="800"
            tooltip={"dshv"}
            labelComponent={
                label ? <VictoryTooltip dy={0} centerOffset={{ x: 25 }} /> : undefined
            }
            colorScale={[theme, white]}
            data={data3}
        />

    );
}


 export default Donut;

 