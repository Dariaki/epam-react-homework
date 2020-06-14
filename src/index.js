import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

const presidentsUSA789 = [
  'Andrew Jackson',
  'Martin Van Buren',
  'William Henry Harrison'
];

const presidentsUSA = [
  {
    firstName:'John',
    lastName: 'Tyler',
    presidentIndex: 10
  },
  {
    firstName:'James K.',
    lastName: 'Polk',
    presidentIndex: 11
  },
  {
    firstName:'Zachary',
    lastName: 'Taylor',
    presidentIndex: 12
  },
  {
    firstName:'Millard',
    lastName: 'Fillmore',
    presidentIndex: 13
  },
  {
    firstName:'Franklin',
    lastName: 'Pierce',
    presidentIndex: 14
  },
];

const formatPresident = (name, lastName, index) => {
  return `${name}, ${lastName}, ${index}th`;
};

const serverData = "[{\"id\":\"666958530825467\",\"title\":\"Friday open-air party w/ Lucarelli, Mihas and Yarik JR | Hide\",\"place\":\"Hide\",\"date\":\"2020-06-12T20:00:00.000Z\"},{\"id\":\"786185895252176\",\"title\":\"Захист скверу імені Чкалова\",\"place\":\"Сквер Им. Чкалова\",\"date\":\"2020-06-10T09:00:00.000Z\"},{\"id\":\"623921328209118\",\"title\":\"Живая музыка на летней террасе\",\"place\":\"От Заката до Рассвета\",\"date\":\"2020-06-14T17:00:00.000Z\"},{\"id\":\"909559356190295\",\"title\":\"Amer (2009)\",\"place\":\"Кіноклуб Кіноха\",\"date\":\"2020-06-13T15:00:00.000Z\"},{\"id\":\"589272605321022\",\"title\":\"В парк Межигорье на теплоходе\",\"place\":\"Причал №6, Почтовая пл.\",\"date\":\"2020-06-13T07:45:00.000Z\"}]";
const parsedServerData = JSON.parse(serverData);

const sortData = (data) => {
  return [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
};

const formatDate = (d) => {

  const fDate = d.toLocaleDateString();
  const fTime = d.toLocaleTimeString().split(' ')[0];

  let fDayTime;
  if (d.getHours() > 5 && d.getHours() < 11) {
    fDayTime = 'Утро';
  } else if (d.getHours() < 17) {
    fDayTime = 'День';
  } else if (d.getHours() < 21) {
    fDayTime = 'Вечер';
  } else {
    fDayTime = 'Ночь';
  }
  return `${fDayTime}, ${fDate}, ${fTime}`;
};


let formState = {
  name: '',
  password: '',
  tariff: 'basic',
  newsletter: true
};

const changeHandler = (event) => {
  formState = {
    ...formState,
    [event.target.name]: event.target.value
  };

};

const toggleCheck = (event) => {
  formState = {
    ...formState,
    newsletter: event.target.checked
  };

};

const submitHandler = (event) => {
  event.preventDefault();

  fetch('https://postman-echo.com/post', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(formState)
  })
    .then(response => response.json())
    .then(result => console.log(result))

};


ReactDOM.render(
  <div>
    <ul>
      <li>George Washington</li>
      <li>John Adams</li>
      <li>Thomas Jefferson</li>
    </ul>
    <ol start="4">
      <li>James Madison</li>
      <li>James Monroe</li>
      <li>John Quincy Adams</li>
    </ol>
    <ul>
      {presidentsUSA789.map(president => <li key={president}>{president}</li>)}
    </ul>
    <ul style={{backgroundColor: '#ddd', paddingTop: '1em', paddingBottom: '1em', fontWeight: 'bold'}}>
      {presidentsUSA.map(president => president.presidentIndex % 2 !== 0 ? (
        <li key={president.presidentIndex}>
          {formatPresident(president.firstName, president.lastName, president.presidentIndex)}
        </li>
      ) : null)}
    </ul>
    <ul>
      {sortData(parsedServerData).map(item => {

          const date = new Date(item.date);

          const isOutDated = () => {
            return date.getTime() < new Date().getTime() ? {color:'rgba(0,0,0,.5)'} : {}
          };

          return (
            <li key={item.id} style={isOutDated()}>
              <a href={`https://www.facebook.com/events/${item.id}/`} target="_blank" style={isOutDated()}>{item.title}</a>
              <p>{`${formatDate(date)}`}</p>
              <p>{item.place}</p>
            </li>
          )
        }
      )}
    </ul>
    <form style={{padding: '0 35px'}} onSubmit={submitHandler}>
        <label htmlFor='name'>Name:</label>
        <input id='name' name='name' autoFocus={true} placeholder='John Doe' required={true} onChange={changeHandler}/>

        <label htmlFor='password'>Password:</label>
        <input id='password' type='password' name='password' minLength='4' autoComplete={''}  onChange={changeHandler}/>

        <label htmlFor='basic-tariff'>
          <input id='basic-tariff' type='radio' value='basic' name='tariff' defaultChecked={true} onChange={changeHandler}/>Basic Tariff
        </label>
        <label htmlFor='premium-tariff'>
          <input id="premium-tariff" type='radio' value='premium' name='tariff' onChange={changeHandler}/>Premium Tariff
        </label>

        <label htmlFor="subscribe">
        <input id="subscribe" type='checkbox' name='newsletter' defaultChecked={true} onChange={toggleCheck}/>I want to receive news on my email
        </label>

        <button type='submit'>Buy</button>
    </form>
  </div>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
