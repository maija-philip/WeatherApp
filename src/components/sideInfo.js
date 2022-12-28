/*
 Author: Maija Philip
 Date: 11-15-2022
 */

 import React from 'react';
 import Donut from './Donut.js';
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
                    <Donut
                        percentage={80}
                        color="#7AC0FA" 
                        />
                    <p> 
                        Visibility {this.props.visibility} meters<br/>
                        Wind Speed {this.props.windSpeed} meters/sec
                    </p>
                    <p>wind direction: {this.props.windDirection}</p>
                    <Donut
                        percentage={23}
                        color="#7AC0FA" 
                        />
                    <p>
                        Sunrise {this.props.sunrise} <br/>
                        Sunset {this.props.sunset}
                    </p>
                    <p>
                        cloudiness: {this.props.cloudiness}
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
}

 export default SideInfo;