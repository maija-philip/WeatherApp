/*
 Author: Maija Philip
 Date: 11-15-2022
 */

 import React from 'react';
 import Donut from './Donut.js';
 // import ReactDOM from 'react-dom/client';
 // import Weather from './get-weather.js';


function SideInfo(props) {

    const {humidity, visibility, windSpeed, windDirection, sunrise, 
        sunset, cloudiness} = props;
    const deg = String.fromCharCode(176);
    const copy = String.fromCharCode(169);
    const percent = String.fromCharCode(37);


    return (
        <section className='side-info-section'>
            <div>
                <p>humidity: {humidity}{percent}</p>
                <Donut
                    percentage={80}
                    color="#7AC0FA" 
                    />
                <p> 
                    Visibility {visibility} meters<br/>
                    Wind Speed {windSpeed} meters/sec
                </p>
                <p>wind direction: {windDirection}{deg}</p>
                <Donut
                    percentage={23}
                    color="#7AC0FA" 
                    />
                <p>
                    Sunrise {sunrise} <br/>
                    Sunset {sunset}
                </p>
                <p>
                    cloudiness: {cloudiness}{percent}
                </p>
                <Donut
                    percentage={10}
                    color="#7AC0FA" 
                    />

                <div className='footer-logo'></div>
                <p>Made by Maija Philip {copy} 2022</p>
            </div>
        </section>
    )
    
}

 export default SideInfo;