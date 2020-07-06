import React, { useState, useEffect, useRef } from 'react'

import City from './CityWeather';
import CitySearch from './CitySearch';
import styles from './css/style.css';

function isValid(str){
  return !/[~`!#$%\^&*+=\-\[\]\\;,/{}|\\":<>\?0-9]/g.test(str);
 }

function Weather(){
  const isFirstRun = useRef(true);               // To avoid the first run. useEffect will run ONLY if the client 
                                                   // clicks the button

  const [error, setError] = useState(null);
  const [cityToSearch, setCityToSearch] = useState("");
  const [validCity, setValidCity] = useState(true);
  const [citiesList, setCitiesList] = useState([]);

  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityToSearch}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`;

  let cityInfoToShow = "";        // Displays the city General Info

  useEffect(() => {
    if (isFirstRun.current) {          // This if just checks the first render and skips it fom the fetch
      isFirstRun.current = false;
      return;
    }

    fetch(URL)
      .then(res => {
        if (res.ok){
          setError(null);
          return res.json();
        }
        else 
          throw Error(`Error catching the API. Possibly unkown city name.`);
      })
      .then(apiData => {
          setCitiesList(citiesList => [...citiesList, {
            city: apiData.name,
            country: apiData.sys.country,
            weatherMain: apiData.weather[0].main,
            weatherDescription: apiData.weather[0].description,
            minTemp: apiData.main.temp_min,
            maxTemp: apiData.main.temp_max,
            position: apiData.coord,
            id: apiData.id,
            key: apiData.id
          }])
      })
      .catch(err => {
        setError(err.message);
      })
  }, [cityToSearch]);


  const searchCity = city => {
    if(isValid(city.name)){ 
      setCityToSearch(city.name);
      setValidCity(true);
    } else
      setValidCity(false);
  }

  const errorCityNameShow = (cityToCheck, valid, err) => {
    if(!valid)
      return <p className="WarningMsg">The city name is not valid. Please try again with different name.</p>;
    else if(cityToCheck.trim() === "")
      return <p className="InitialMsg">Please type a city name.</p>;
    else if(err !== null)                 // Checks for error in the fetch
      return <p className="WarningMsg">{err}</p>; 
    
    return "";
  }

  const cityToShow = (city="") => {

    if (city === "")
      return "";
    else
      return <City
        city={city.city}
        country={city.country}
        weatherMain={city.weatherMain}
        weatherDescription={city.weatherDescription}
        minTemp={city.minTemp}
        maxTemp={city.maxTemp}
        position={city.position}
        id={city.id}
        key={city.id}
        eliminateCity={eliminateCity}
      />;
  }  

  const eliminateCity = keyValue => {
    setCitiesList(citiesList.filter(el => el.key !== keyValue ));
  }

  const validationErrorMessage = errorCityNameShow(cityToSearch, validCity, error);

  return (
    <div className="ListContainer">
      <CitySearch searchCity={searchCity}/>
      { validationErrorMessage }
      { citiesList.map(el => cityToShow(el)) }
    </div>
  )
}

export default Weather