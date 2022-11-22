/*
 Author: Maija Philip
 Date: 10-31-2022
 */

import React from 'react';
// import ReactDOM from 'react-dom/client';
import MainInfo from './mainInfo.js';
import SideInfo from './sideInfo.js';

let showPosCount = 0;

class Weather extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lat: 0,
            long: 0,
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
        
       
    }


    // callback for geo location (coordinates)
    showPosition = (position) => {
        showPosCount++;
        if (showPosCount > 1) {
            return;
        }
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        console.log("showPosition()", showPosCount, lat, long); 

        this.setState({
            lat: lat,
            long: long
        });

        // call weather api 
        let apilink = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&units=metric&appid=93cdecae9a0750d5c69952cbf90825f0";
        console.log("Called Weather API", apilink);
        fetch(apilink)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
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
        console.log("Called Location API", apilink);
        fetch(apilink)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.processLocationData(result);
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
        let timezoneUTCshift = result.timezone;

        // make the sunrise/sunset times 12hr and to the time zone
        // multiply by 1000 to turn from seconds to miliseconds
        let sunriseMili = result.sys.sunrise;
        let sunsetMili = result.sys.sunset;

        let sunriseDate = new Date (sunriseMili * 1000);  
        let sunsetDate = new Date (sunsetMili * 1000);
        console.log(sunriseDate, sunsetDate);
        console.log(sunriseMili, sunsetMili);


        // format the dates to be for example 6:54am and 4:54pm
        let sunriseMinutes = sunriseDate.getMinutes(); 
        let sunriseTime = sunriseDate.getHours() + ':';

        if(sunriseMinutes < 10) {
            sunriseTime += '0' + sunriseMinutes + 'am';
        } else {
            sunriseTime += sunriseMinutes + 'am';

        }
        

        let sunsetTime = sunsetDate.getHours() - 12;
        let sunsetMinutes = sunsetDate.getMinutes();

        if(sunsetMinutes < 10) {
            sunsetTime += ':' + '0' + sunsetMinutes + 'pm';

        } else {
            sunsetTime += ':' + sunsetMinutes + 'pm';
        }

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
            isLoadedWeather: true
        });

        this.getTime(sunriseMili, sunsetMili);
    }

    processLocationData = (result) => {
        //process the data and then set state

        this.setState({
            city: result[0].name,
            state: result[0].state,
            country: result[0].country,
            isLoadedLocation: true
        });
    }
    
     // get the time and put it into a timeSection
     getTime = (sunriseMili, sunsetMili) => {
        console.log("Start GetTime");

        let currentDate = new Date();
        let hour = currentDate.getHours();
        let minutes = currentDate.getMinutes();

        let sunriseDate = new Date (sunriseMili * 1000);  
        let sunriseHour = sunriseDate.getHours();
        let sunriseMin = sunriseDate.getMinutes();
        console.log("sunrise set", sunriseHour, sunriseMin);

        let sunsetDate = new Date (sunsetMili * 1000);  
        let sunsetHour = sunsetDate.getHours();
        let sunsetMin = sunsetDate.getMinutes();
        console.log("sunset set", sunsetHour, sunsetMin);

        console.log(sunriseDate, sunsetDate)
        console.log(this.state.sunriseMili, this.state.sunsetMili);


        var timeSection = '';

        // check if it's sunrise time section
            // if hour is same as sunrise hour
            // if hour is one less and minutes are greater than min
            // if hour is one more and minutes are less than sunrise min
        if (hour == sunriseHour || 
            (hour == sunriseHour - 1 && minutes > sunriseMin) ||
            (hour == sunriseHour + 1 && minutes < sunriseMin)) {
            console.log("sunrise", hour, minutes);
            timeSection = 'SUNRISE';
        }
        // check if it's sunset time section
            // same checks as sunrise
        else if (hour == sunsetHour || 
            (hour == sunsetHour - 1 && minutes > sunsetMin) ||
            (hour == sunsetHour + 1 && minutes < sunsetMin)) {
                console.log("sunset", hour, minutes);

            timeSection = 'SUNSET';
        }
        // check if it's night time
            // if hour > sunsetHour
            // if hour < sunriseHour
        else if (hour > sunsetHour || 
            hour < sunriseHour) {
                console.log("sunrise", sunriseHour, "sunset", sunsetHour);
                console.log("night", hour, minutes);

                timeSection = 'NIGHT';
        }
        // if it's clear outside
            // cloudiness < 70
        else if (this.state.cloudiness < 70) {
            console.log("clear", hour, minutes);
            timeSection = 'CLEAR'
        }
        // it's overcast
        else {
            console.log("overcast", hour, minutes);
            timeSection = 'OVERCAST'
        }

        console.log("Time Section", timeSection);


        this.setState({
            currentTimeSection: timeSection,
        });

        console.log("currentTimeSection", this.state.currentTimeSection);

    }

    render() {
        console.log("Render Started", this.state.currentTimeSection)
        const { error, isLoadedWeather, isLoadedLocation } = this.state;
        if (error) {
            // ERROR HAS OCCURED
            return <div>Error: {error.message}</div>;

        } else if (!isLoadedWeather || !isLoadedLocation) {
            // HERE IS WHERE YOU PUT A LOADY SPINNY
            return <div>Loading...</div>

        } else{
            // GENERAL RETURN

            return(
                <div className='get-weather-div'>

                    <MainInfo 
                        temp={this.state.temp} 
                        description={this.state.description}
                        feelsLike={this.state.feelsLike}
                        minTemp={this.state.minTemp}
                        maxTemp={this.state.maxTemp}
                        sunrise={this.state.sunrise}
                        sunset={this.state.sunset}
                        city={this.state.city}
                        timeSection={this.state.currentTimeSection}
                        />

                    <SideInfo 
                        humidity={this.state.humidity} 
                        visibility={this.state.visibility}
                        windSpeed={this.state.windSpeed}
                        windDirection={this.state.windDirection}
                        sunrise={this.state.sunrise}
                        sunset={this.state.sunset}
                        cloudiness={this.state.cloudiness}
                        timeSection={this.state.currentTimeSection}
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