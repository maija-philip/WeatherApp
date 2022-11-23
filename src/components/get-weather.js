/*
 Author: Maija Philip
 Date: 10-31-2022
 */

import React from 'react';
// import ReactDOM from 'react-dom/client';
import MainInfo from './mainInfo.js';
import SideInfo from './sideInfo.js';

// I would add a comment about why you have this odd variable here.  I remember why it is here,
// but if you came back in 6 months you might be quite puzzled.
// "Quick hack so that React doesn't double-call my service in dev mode."  etc.
let showPosCount = 0;

// I usually keep the name of the Component the same as the filname.  You only have a couple 
// files so it is easy to keep track of, but once you have more files it'll get really
// annoying, especially if sharing with others.
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
        // else ... what happens?  can permission to this be denied in the browser?
        // in your render() method you have a section for error (which, by the way isn't
        // defaulted to a value in your constructur ...), maybe there's an error for
        // "you didn't give us permission"?
    }


    // callback for geo location (coordinates)
    showPosition = (position) => {
        showPosCount++;
        if (showPosCount > 1) {
            // React calls all methods twice in development mode, and I don't want to use up
            // my daily service call limit, so this is a quick hack to cut the calls in half.
            return;
        }
        // const lat ...
        // const long ...
        let lat = position.coords.latitude;
        let long = position.coords.longitude;

        // You have a lot of console.log() comments scattered throughout your app.  I put 
        // those in to debug an issue, and then when I figure it out, I remove them.  If 
        // you don't, you end up with this very noisy and messy console that makes it
        // difficult to focus on what you are working on.  So as soon as I verify that 
        // I have it working the way I want, I remove console.log() lines and re-run
        // it until I get a clean console.  
        // If I think I'm likely going to need to add that console.log() back in, I'll 
        // just comment it and leave it in the code, but they are pretty easy to add in,
        // so I often just delete them when I'm done with them.
        console.log("showPosition()", showPosCount, lat, long); 

        // Calling setState() will made React start another render.  So you should only
        // do this if you have information that you want to update in your display ...
        // These two state variables aren't actually accessed anywhere else in your Component,
        // so why bother putting them into the state at all?
        // So I think you just delete this code, and also remove their initialization 
        // in the contructor as part of the state.
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

        // const ...
        // const ...
        // use const!  :)
        // Your default should be 'const' at all times.  Only use 'let' if necessary.

        // make the sunrise/sunset times 12hr and to the time zone
        // multiply by 1000 to turn from seconds to miliseconds
        let sunriseMili = result.sys.sunrise;
        let sunsetMili = result.sys.sunset;

        let sunriseDate = new Date (sunriseMili * 1000);  
        let sunsetDate = new Date (sunsetMili * 1000);
        console.log(sunriseDate, sunsetDate);
        console.log(sunriseMili, sunsetMili);

/*
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
*/
        // I was like "wow, there's a lot of code here", and then I realized that you were basically
        // doing the same thing twice.  So I condensed it.  I haven't tried running it, but I'm
        // pretty sure it does exactly the same thing.  Try it out.
        const convertToMyTimeFormat = (hours, minutes, suffix) => {
            return `${hours}:${minutes < 10 ? 0 : ''}${minutes}${suffix}`;
        }
        const sunriseTime = convertToMyTimeFormat(sunriseDate.getHours(), sunriseDate.getMinutes(), 'am'); 
        const sunsetTime = convertToMyTimeFormat(sunsetDate.getHours() - 12, sunsetDate.getMinutes(), 'pm');

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

            // You were calling this.setState() twice, once here and once in getTime().
            // That's probably fine since both happen sequentially, there will only be one render()
            // after executing these functions, but I would try to make it habit to be very
            // careful with my calls to setState(), so let's just combine them, it is more
            // clear and less code anyway.
            // Change the name of getTime() and have it return the result instead of 
            // calling setState().
            currentTimeSection: calculateTimeSection(sunriseMili, sunsetMili)
        });

        // You should rename this method.  "getTime()" sounds like an accessor function,
        // like "getDate()", but really you are doing some complicated calculations in there.
        // You are really getting the "timeSection", so call it
        // calculateTimeSection();
        // this.getTime(sunriseMili, sunsetMili);
    }

    // This is such a short piece of code, could probably just get ride of this function call
    // and put this directly into the fetch call above.
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


        // I find it very strange that you use 'var' now and then.  I think of that as very
        // "old fashioned" javascript.  I use;
        // const foo ... if I'm not going to change the value (which inculdes 
        //               Object and Array variables)
        // let foo ... only if I have a variable (meaning I change the value)
        var timeSection = '';

        // The format of this big change "if" is a little hard to follow, because 
        // of how you formated the comments.  Sometimes it is useful to write out 
        // your logic and use cases before you code it (which this kind of looks like),
        // but then those comments aren't as useful later on (they became obvious/redudant).
        // Are they still adding anything?  Maybe just remove them?  Or at least 
        // reorganize and format like a regular if/else chain.
        //
        // if (...) {
        //     
        // } else if (...) {
        //     // put a comment here
        // }

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

        // You can remove this if you make my changes in the calling function.
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

            // I would do this, rather than scatter "this.state" everywhere.  It's just a habit, seems cleaner,
            // and then I don't find some random "this.state.someOldVariableIForgotAbout" hidden in my JSX
            // at some later point in time.
            const { description, feelsLike, minTemp, maxTemp, sunrise, sunset, city, currentDate } = this.state;

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