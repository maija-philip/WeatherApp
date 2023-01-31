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
                    percentage={humidity}
                    total={100}
                    />
                <p> 
                    Visibility {visibility} meters<br/>
                    Wind Speed {windSpeed} meters/sec
                </p>
                <p>wind direction: {windDirection}{deg}</p>
                <Donut
                    percentage={windDirection}
                    total={360}
                    />
                <p>
                    Sunrise {sunrise} <br/>
                    Sunset {sunset}
                </p>
                <p>
                    cloudiness: {cloudiness}{percent}
                </p>
                <Donut
                    percentage={cloudiness}
                    total={100}
                    />

                <div className='footer-logo'></div>
                <p>Made by Maija Philip {copy} 2022</p>
            </div>
        </section>
    )
    
}

 export default SideInfo;