/*
 Author: Maija Philip
 Date: 11-15-2022
 */

 import React from 'react';
 // import ReactDOM from 'react-dom/client';
 // import Weather from './get-weather.js';


class MainInfo extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        
        return (
            <div><b>Main Info</b>
                <p> 
                        temp: {this.props.temp} <br/>
                        description: {this.props.description} <br/>
                        feels like: {this.props.feelsLike} <br/>
                        min temp: {this.props.minTemp} <br/>
                        max temp: {this.props.maxTemp} <br/>
                        city: {this.props.city} <br/>
                        timeSection: {this.props.timeSection}
                    </p>
            </div>
        )
    }
}

 export default MainInfo;