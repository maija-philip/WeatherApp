/*
 Author: Maija Philip
 Date: 11-15-2022
 */

 import React from 'react';
 // import ReactDOM from 'react-dom/client';
 // import Weather from './get-weather.js';

// You should figure out your naming pattern.  I would have named this file "SideInfo.jsx".
// I use .jsx for React files, and .js if it is just a straight .js file.  I don't know that 
// that is important, but it is a pattern and I stick to it.  The more patterns
// you have, the less "thinking" you have to do about things.  :)
class SideInfo extends React.Component {

    // Give that this Component has no actual state of lifecycle methods, I
    // would probably just make it a functional component.
    constructor(props) {
        super(props);
    }

    render() {
        // 'deg' isn't used, can remove?  shouldn't both of these be 'const'?
        let deg = String.fromCharCode(176);
        let copy = String.fromCharCode(169);

        // I like to do this:
        // const { humidity, visibility, windSpeed, windDirection, sunrise, sunset, cloudiness } = this.props;
        // Good pattern, makes it clear what you are using from props, and makes the rest of the code in 
        // your function a bit more readable.  I also find it easier to have all of this in one
        // location to debug.  One of my first tests when smoething is going wrong is to check the props
        // going to each Component, that's harder to do when "this.props.foo" is scattered all over.

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