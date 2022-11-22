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
        let deg = String.fromCharCode(176);
        let copy = String.fromCharCode(169);

        return (
            <section className='side-info-section'>
                <div>
                    <p>humidity: {this.props.humidity}</p>
                    <p> 
                        Visibility {this.props.visibility} meters<br/>
                        Wind Speed {this.props.windSpeed} meters/sec
                    </p>
                    <p>wind direction: {this.props.windDirection}</p>
                    <p>
                        Sunrise {this.props.sunrise} <br/>
                        Sunset {this.props.sunset}
                    </p>
                    <p>
                        cloudiness: {this.props.cloudiness}
                    </p>

                    <div className='footer-logo'></div>
                    <p>Made by Maija Philip {copy} 2022</p>
                </div>
            </section>
        )
    }
}

 export default SideInfo;