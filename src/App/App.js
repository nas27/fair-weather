import { useEffect, useState } from "react";
import { WeatherDay } from "/Users/nastasia/Documents/Projects/fair-weather/src/WeatherDay/WeatherDay.js";
import styles from './styles.module.css';
import { apiKey } from "/Users/nastasia/Documents/Projects/fair-weather/src/env.js";
import { SearchLoc } from "./SearchLoc/SearchLoc";

//arrow function short n sweet syntax
//export here instead of default at bottom
export const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
export const App = () => {

  //hardcoded location for testing purposes
  //const locationKey = '49543_PC';

  const [locationKey, setLocationKey] = useState('');

 

  const [weatherInfo, setWeatherInfo] = useState();

  const [location, setLocation] = useState(''); 

  

  //function to check digit & add leading zero if single (workaround for api response)
  const iconNum = (num) => {
    //this converts num to string by adding empty string
      const stringNum = num + '';
      const stringLen = stringNum.length;

      if (stringLen === 1) {
        return '0' + stringNum; //7 becomes 07 to satisfy url requirements
      } else {
        return stringNum;
      }
  };

//Canada-convert F->C
function convertToCelcius(fahrenheit) 
{
  var celcius = (fahrenheit - 32) * 5 / 9;
  //round up to nearest whole number
  return Math.ceil(celcius);
} 


  //TBD - fix to interpolate above variables into key
  const apiUrl = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/locationKey=${locationKey}?apikey=${apiKey}`;
  //const apiUrl = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/locationKey=49543_PC?apikey=7Eo1vG2AlMxgC3GpWxTAu89cUQ8xsSAu';
  //to get around CORS security feature



  //converts the response to JSON 
  useEffect(() => {

  const daysofWeek = [ 'Sunday', 'Monday' ,'Tuesday', "Wednesday", "Thursday", "Friday", "Saturday"];


    console.log(locationKey);

    if(locationKey){
      fetch(proxyUrl + apiUrl, {

        headers: {
          'Origin': 'http://localhost:3000',
          'Access-Control-Request-Method': '*',
          'Authorization': apiKey
  
        }
      })
      .then(res => res.json())
      .then(res => { 
        console.log(res);
          setWeatherInfo(res.DailyForecasts 
          .map(df => {
            return {
            min: convertToCelcius(df.Temperature.Minimum.Value),
            max: convertToCelcius(df.Temperature.Maximum.Value),
            weatherType: df.Day.IconPhrase,
            weatherIcon: iconNum(df.Day.Icon),
            dateDay: daysofWeek[new Date(df.Date).getDay()],
            }
            
        }))
      });
    }


    //whenever we get a new location, this block will rerun
}, [locationKey]);


//container for 5 days, map each return item to its own div
// !!weatherInfo checks if weather if is Not undefined-->
  return (
    

    <div>
      <SearchLoc
        onCityFound={ cityInfo => {
          console.log('Found', cityInfo);
          setLocationKey(cityInfo.key);
          setLocation(cityInfo.cityName + ', ' + cityInfo.province);
        }}
      />
        <h1 className={styles.header}>{location}</h1>


        <div className={styles.main}>
          {!!weatherInfo && weatherInfo.map((i, index) => (

        <div className={styles.day} key={index}>
            <WeatherDay
              min={i.min} 
              max={i.max} 
              weatherType={i.weatherType} 
              weatherIcon={i.weatherIcon}
              dateDay={i.dateDay}
            />
        </div>
        ))}
      </div>
    </div>
  
  );



}