/*
 Author: Maija Philip
 Date: 11-15-2022
 */

 import React from 'react';
 // import ReactDOM from 'react-dom/client';
 // import Weather from './get-weather.js';


class SideInfo extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div><b>Side Info</b>
                <p> 
                        humidity: {this.props.humidity} <br/>
                        visibility: {this.props.visibility} <br/>
                        wind speed: {this.props.windSpeed} <br/>
                        wind direction: {this.props.windDirection} <br/>
                        sunrise: {this.props.sunrise} <br/>
                        sunset: {this.props.sunset} <br/>
                        cloudiness: {this.props.cloudiness} <br/>
                        timeSection: {this.props.timeSection}
                    </p>
            </div>
        )
    }
}

 export default SideInfo;