/*
 Author: Maija Philip
 Date: 11-15-2022
 */
import React from 'react';
import Donut from './Donut.js';

function SideInfo(props) {
    const { humidity, visibility, windSpeed, windDirection, sunrise, sunset, cloudiness } = props;
    const deg = String.fromCharCode(176);
    const copy = String.fromCharCode(169);
    const percent = String.fromCharCode(37);

    const windDirectionPercentage = Math.floor((windDirection / 360) * 100);

    return (
        <section className="side-info-section">
            <div>
                <p>
                    humidity: {humidity}
                    {percent}
                </p>
                <Donut percentage={humidity} />
                <p>
                    Visibility {visibility} meters
                    <br />
                    Wind Speed {windSpeed} meters/sec
                </p>

                <p>
                    wind direction: {windDirection}
                    {deg}
                </p>
                {/* I wasn't sure what you wanted the donut to show for wind direction, that
                seems an odd thing to donut.  You donut needs a % to work correctly, but you 
                could pass the label separately if you wanted.
                */}
                <Donut percentage={windDirectionPercentage} />
                <p>
                    Sunrise {sunrise} <br />
                    Sunset {sunset}
                </p>
                <p>
                    cloudiness: {cloudiness}
                    {percent}
                </p>
                <Donut percentage={cloudiness} />

                <div className="footer-logo"></div>
                <p>Made by Maija Philip {copy} 2022</p>
            </div>
        </section>
    );
}

export default SideInfo;
