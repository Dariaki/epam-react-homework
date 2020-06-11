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
    <ul>
      {presidentsUSA.map(president => president.presidentIndex % 2 !== 0 ? (
        <li key={president.presidentIndex}>
          {formatPresident(president.firstName, president.lastName, president.presidentIndex)}
        </li>
      ) : null)}
    </ul>
  </div>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
