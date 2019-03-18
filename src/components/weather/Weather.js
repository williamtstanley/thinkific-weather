import React from 'react';
import format from 'date-fns/format';
import './weather.scss';

const getOpenWeatherIconUrl = icon =>
  `http://openweathermap.org/img/w/${icon}.png`;

const WeatherDetails = props => (
  <div className="weather-details">
    <h2 className="weather-details__time">
      {format(new Date(props.dt_txt), 'HH:mm')}
    </h2>
    <div className="weather-details__forecast">
      <img
        alt="Weather icon"
        src={getOpenWeatherIconUrl(props.weather[0].icon)}
      />
      <span>{props.weather[0].description}</span>
    </div>
    <div className="weather-details__temp">
      <h3>Min {props.main.temp_min}</h3>
      <h3>Max {props.main.temp_max}</h3>
    </div>
  </div>
);

export const Results = props => (
  <section>
    <h1 className="weather-city">{props.city.name}</h1>
    <ul className="weather-list">
      {Object.entries(props.list).map(([key, items]) => (
        <li key={`${props.city.name}-${key}`} className="weather-daily">
          <h2>{key}</h2>
          <section className="weather-daily__details">
            {items.map(item => (
              <WeatherDetails key={item.dt_txt} {...item} />
            ))}
          </section>
        </li>
      ))}
    </ul>
  </section>
);
