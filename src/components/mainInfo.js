/*
 Author: Maija Philip
 Date: 11-15-2022
 */

 import React from 'react';
 // import ReactDOM from 'react-dom/client';
 // import Weather from './get-weather.js';


function MainInfo (props) {
   
    const {maxTemp, minTemp, temp, feelsLike, description, city, state} = props;
    const deg = String.fromCharCode(176);
    /*
        the plain degree sign in html is @#176 or @deg
        for ˚C it's &#8451
        for ˚F it's &#8457
    */
    
    return (
        <section className='main-info-section'>
            
            <div className='high-low-temps'>
                <p>
                    High of {maxTemp}{deg}<br/>
                    Low of {minTemp}{deg}
                </p>
            </div>

            <div className='main-content'>
                <h1>{temp}{deg}</h1>
                <p>Feels Like {feelsLike}{deg}</p>
                <h2>{description}</h2>
                <p>{city}, {state}</p>
            </div>
        </section>
    )
    
}

 export default MainInfo;

 /*
 Print out all the data
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
 */