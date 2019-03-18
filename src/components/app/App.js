import React, { useState } from 'react';
import classnames from 'classnames';
import axios from 'axios';
import { Results } from '../weather';
import './App.scss';

const apiKey = 'ee15e5dc2b8ff43e6560d17e5a82b642';

function App(props) {
  const [state, setState] = useState({ list: [], city: {} });
  function fetchWeather(query) {
    const getUrl = (query, apiKey) =>
      `http://api.openweathermap.org/data/2.5/forecast?units=metric&q=${query}&APPID=${apiKey}`;

    axios
      .get(getUrl(query, apiKey))
      .then(({ data: { city, list } }) => {
        const dayMap = {};

        list.forEach(listItem => {
          const day = listItem.dt_txt.split(' ')[0];
          if (dayMap[day]) {
            dayMap[day].push(listItem);
          } else {
            dayMap[day] = [listItem];
          }
        });

        setState({ city, list: dayMap });
      })
      .catch(console.log);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    fetchWeather(formData.get('search'));
  }

  return (
    <div
      className={classnames('app', {
        'app--list-populated': Object.keys(state.list).length,
      })}
    >
      <form className="search-form" onSubmit={e => handleSubmit(e)}>
        <div className="search-input-container">
          <input
            className="search-input"
            aria-label="search"
            placeholder="Vancouver, CA"
            type="text"
            name="search"
          />
          <button className="search-button" type="submit">
            search
          </button>
        </div>
      </form>
      <Results city={state.city} list={state.list} />
    </div>
  );
}

export default App;
