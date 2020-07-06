import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function CityWeather(props) {

    const eliminateComponent = () => {
        props.eliminateCity(props.id);
    }

    return (
        <div className="CityWeather">
            <span className="City-Country">{props.city}, {props.country}</span>
            <button className="btn-close" onClick={eliminateComponent}>X</button>
            <p className="MainWeatherTitle">{props.weatherMain} </p>
            <p className="DescWeatherTitle">{props.weatherDescription}</p>
            <p className="MinTemp">min temp: &nbsp;&nbsp;{props.minTemp}</p>
            <p className="MaxTemp">max temp: &nbsp;&nbsp;{props.maxTemp}</p>
            <p className="Location">location: &nbsp;&nbsp;{props.position.lon}, {props.position.lat}</p>
            <Link to={`/${props.name}`}>
                <p>View City Weather Stats</p>
            </Link>
        </div>
    )
}

export default CityWeather
