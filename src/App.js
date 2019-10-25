import React from 'react';
import './App.css';
import { Card, CardContent } from '@material-ui/core';
import moment from 'moment';

function App() {
  function counterPage(type) {
    const year = moment().format('YYYY')
    window.location = year + '/count/' + type;
  }

  return (
    <div className="App" style={{ backgroundColor: '#00A49A' }}>
      <header className="App-header">
        <Card className="card-container" onClick={() => counterPage('presma')}>
          <CardContent>
            <p style={{ color: '#616161' }}>Presma</p>
          </CardContent>
        </Card>
        <Card className="card-container" onClick={() => counterPage('dpm')}>
          <CardContent>
            <p style={{ color: '#616161' }}>DPM</p>
          </CardContent>
        </Card>
      </header>
    </div>
  );
}

export default App;
