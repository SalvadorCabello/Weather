import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

function CityId() {
    const [name, setName] = useState(null);

    const pr = useParams();
    useEffect(() => {
        fetchItem();
        console.log(name);
    }, [])

    // http://api.openweathermap.org/data/2.5/forecast?q=Mexico&appid=ac534896b7970fabdbfd83f3626dee64
    const fetchItem = async () => {
        const fetchCityData = await fetch(`api.openweathermap.org/data/2.5/forecast?q=${pr.name}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`);
        const cityData = await fetchCityData.json();
        setName(cityData);
    }

    return (
        <div>
            <h1>City</h1>
            <p>City Id: {pr.name}</p>
            
        </div>
    );
}

/*
<LineChart
                width={400}
                height={400}
                data={data}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
                <XAxis dataKey="name" />
                <Tooltip />
                <CartesianGrid stroke="#f5f5f5" />
                <Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={0} />
                <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />
            </LineChart>
*/

export default CityId;