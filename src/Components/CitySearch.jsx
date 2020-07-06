import React, { useState } from 'react';

import magnifierIcon from './imgs/magnifier.png'

function CitySearch(props) {
    const [input, setInput] = useState({ name: "" });

    const handleSubmit = e => {
        e.preventDefault();
        document.getElementById("fieldCityName").value="";
        document.getElementById("searchButton").disabled = true;
        props.searchCity(input);
    }

    const verifyText = e => {

        if(e.target.value.trim() === "")
            document.getElementById("searchButton").disabled = true;
        else
            document.getElementById("searchButton").disabled = false;

        setInput({ name: e.target.value })
    }

    return (
        <form onSubmit={ handleSubmit }>
            <div className="FormContainer">
                <button className="MagnifierIcon" type="submit">
                    <img src={magnifierIcon} alt="" />
                </button>
                <input type="text" placeholder="Search City" id="fieldCityName"
                    onInput={verifyText} />
                <button id="searchButton" type="submit" disabled="true">Search</button>
            </div>
        </form>
    )
}

export default CitySearch;
