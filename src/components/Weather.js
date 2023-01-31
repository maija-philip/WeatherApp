/*
 Author: Maija Philip
 Date: 10-31-2022
 */

// import logo from './logo.svg';

import React from 'react';
// import ReactDOM from 'react-dom/client';
import MainInfo from './MainInfo.js';
import SideInfo from './SideInfo.js';
import '../theme.css';
import '../App.css';

// quick fix to make sure react doesnt double call the api
let showPosCount = 0;

class Weather extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            temp: 0,
            description: "",
            feelsLike: 0,
            minTemp: 0,
            maxTemp: 0,
            humidity: 0,
            visibility: 0,
            windSpeed: 0,
            windDirection: 0,
            sunrise: 0,
            sunset: 0,
            cloudiness: 0,
            timezone: 0,
            city: "",
            country: "",
            state: "",
            isLoadedWeather: false,
            isLoadedLocation: false,
            currentTimeSection: ''
        };
    }

    componentDidMount() {

        // get the location
            // will also call the api to get weather data
            this.getGeoLocation();

        
    }

    getGeoLocation = () => {
    
        if (navigator.geolocation) {
            // create callback for when the location is received
            navigator.geolocation.getCurrentPosition(this.showPosition);
        }
        else { 
            const error = {message: "Geoloaction Permissions Denied"};
            this.setState({
                isLoadedWeather: true,
                error
            });
        }
        
       
    }


    // callback for geo location (coordinates)
    showPosition = (position) => {
        // makes sure api is only called once instead of the twice in dev mocde
        showPosCount++;
        if (showPosCount > 1) {
            return;
        }

        const lat = position.coords.latitude;
        const long = position.coords.longitude;


        // call weather api 
        let apilink = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&units=metric&appid=93cdecae9a0750d5c69952cbf90825f0";
        console.log("Called Weather API");
        fetch(apilink)
            .then(res => res.json())
            .then(
                (result) => {
                    this.processWeatherData(result);
                },
                (error) => {
                    this.setState({
                        isLoadedWeather: true,
                        error
                    });
                }
            )

        // call location API
        apilink = "http://api.openweathermap.org/geo/1.0/reverse?lat=" + lat + "&lon=" + long + "&appid=93cdecae9a0750d5c69952cbf90825f0";
        console.log("Called Location API");
        fetch(apilink)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        city: result[0].name,
                        state: result[0].state,
                        country: result[0].country,
                        isLoadedLocation: true
                    });
                },
                (error) => {
                    this.setState({
                        isLoadedLocation: true,
                        error
                    });
                }
            )
    }

    processWeatherData = (result) => {
        //process the data and then set state
        const timezoneUTCshift = result.timezone;

        // make the sunrise/sunset times 12hr and to the time zone
        // multiply by 1000 to turn from seconds to miliseconds
        const sunriseDate = new Date (result.sys.sunrise * 1000);  
        const sunsetDate = new Date (result.sys.sunset * 1000);


        // makes the date into display format (ex. 7:03pm)
        const convertToMyTimeFormat = (hours, minutes, suffix) => {
            return `${hours}:${minutes < 10 ? 0 : ''}${minutes}${suffix}`;
        }

        const sunriseTime = convertToMyTimeFormat(sunriseDate.getHours(), sunriseDate.getMinutes(), 'am');
        const sunsetTime = convertToMyTimeFormat(sunsetDate.getHours() - 12, sunsetDate.getMinutes(), 'pm');

        // find the section of time to see what color the page should be in
        const timeSection = this.calculateTimeSection(sunriseDate, sunsetDate);


        // TODO round the numbers!!
        this.setState({
            temp: Math.round(result.main.temp),
            description: result.weather[0].description,
            feelsLike: Math.round(result.main.feels_like),
            minTemp: Math.round(result.main.temp_min),
            maxTemp: Math.round(result.main.temp_max),
            humidity: result.main.humidity,
            visibility: result.visibility,
            windSpeed: result.wind.speed,
            windDirection: result.wind.deg,
            sunrise: sunriseTime,
            sunset: sunsetTime,
            cloudiness: result.clouds.all,
            timezone: timezoneUTCshift,
            isLoadedWeather: true,
            currentTimeSection: timeSection
        });

    }

    
     // get the time and put it into a timeSection to set the color for the site
     calculateTimeSection = (sunriseDate, sunsetDate) => {

        const currentDate = new Date();
        const hour = currentDate.getHours();
        const minutes = currentDate.getMinutes();

        const sunriseHour = sunriseDate.getHours();
        const sunriseMin = sunriseDate.getMinutes();

        const sunsetHour = sunsetDate.getHours();
        const sunsetMin = sunsetDate.getMinutes();

            

        let timeSection = '';

        
        if (hour === sunriseHour || 
            (hour === sunriseHour - 1 && minutes > sunriseMin) ||
            (hour === sunriseHour + 1 && minutes < sunriseMin)) {
                // check if it's sunrise time section
                // if hour is same as sunrise hour
                // if hour is one less and minutes are greater than min
                // if hour is one more and minutes are less than sunrise min
                timeSection = 'SUNRISE';

        }
        else if (hour === sunsetHour || 
            (hour === sunsetHour - 1 && minutes > sunsetMin) ||
            (hour === sunsetHour + 1 && minutes < sunsetMin)) {
                // check if it's sunset time section
                // same checks as sunrise
                timeSection = 'SUNSET';
        }
        else if (hour > sunsetHour || 
            hour < sunriseHour) {
                // check if it's night time
                timeSection = 'NIGHT';
        }
        else if (this.state.cloudiness < 70) {
            // if it's clear outside
            timeSection = 'CLEAR'
        }
        else {
            // it's overcast
            timeSection = 'OVERCAST'
        }

        // get the css root element for styling based on time section
        const root = document.querySelector(':root');
        const colors = {
                NIGHT: ['#5355AC', '#7376E9'],
                SUNRISE: ['#F87676', '#A44539'],
                SUNSET: ['#FBAA5F', '#8A500C'],
                CLEAR: ['#7AC0FA', '#376BBA'],
                OVERCAST: ['#BDCCD9', '#557185'],
                BLACK: ['#020E26'],
                WHITE: ['#F7F7F7']
            };

        root.style.setProperty('--theme', colors[timeSection][0]);
        root.style.setProperty('--theme-dark', colors[timeSection][1]);

        if (timeSection == 'NIGHT') {
            root.style.setProperty('--black', colors['WHITE'][0]);
            root.style.setProperty('--white', colors['BLACK'][0]);
        }
        else {
            root.style.setProperty('--black', colors['BLACK'][0]);
            root.style.setProperty('--white', colors['WHITE'][0]);
        }


        return timeSection;

    }

    render() {
        console.log("Render Started", this.state.currentTimeSection)
        const { error, isLoadedWeather, isLoadedLocation } = this.state;
        if (error) {
            // ERROR HAS OCCURED
            return <div>Error: {error.message}</div>;

        } else if (!isLoadedWeather || !isLoadedLocation) {
            // HERE IS WHERE YOU PUT A LOADY SPINNY
            return (
                <div className='loaderBox'>
                    <div className='loader'></div>
                </div>
                );

        } else{
            // GENERAL RETURN

            // main info vars
            const {temp, description, feelsLike, minTemp, maxTemp, 
                sunrise, sunset, city, state, currentTimeSection} = this.state;

            // side info vars
            const {humidity, visibility, windSpeed, windDirection, 
                cloudiness} = this.state;

            return(
                <div className='get-weather-div'>

                    <MainInfo 
                        temp={temp} 
                        description={description}
                        feelsLike={feelsLike}
                        minTemp={minTemp}
                        maxTemp={maxTemp}
                        sunrise={sunrise}
                        sunset={sunset}
                        city={city}
                        state={state}
                        timeSection={currentTimeSection}
                        />

                    <SideInfo 
                        humidity={humidity} 
                        visibility={visibility}
                        windSpeed={windSpeed}
                        windDirection={windDirection}
                        sunrise={sunrise}
                        sunset={sunset}
                        cloudiness={cloudiness}
                        timeSection={currentTimeSection}
                        />
                </div>
            );
        }

        
    }

    
} // end of weather


export default Weather;


/*

Print out all the data

<p>Weather Data: {this.state.lat}, {this.state.long}</p>
<p> 
    temp: {this.state.temp} <br/>
    description: {this.state.description} <br/>
    feels like: {this.state.feelsLike} <br/>
    min temp: {this.state.minTemp} <br/>
    max temp: {this.state.maxTemp} <br/>
    humidity: {this.state.humidity} <br/>
    visibility: {this.state.visibility} <br/>
    wind speed: {this.state.windSpeed} <br/>
    wind direction: {this.state.windDirection} <br/>
    sunrise: {this.state.sunrise} <br/>
    sunset: {this.state.sunset} <br/>
    cloudiness: {this.state.cloudiness} <br />
    timezone: {this.state.timezone}
</p>
<p>
    city: {this.state.city} <br/>
    state: {this.state.state} <br />
    country: {this.state.country}
</p>

*/