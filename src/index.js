import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './App';
import CounterPage from './pages/ShowCounterPage.js';
import * as serviceWorker from './serviceWorker';
import { AppBar, Toolbar, Typography, Box } from '@material-ui/core';
import { Route, BrowserRouter as Router } from 'react-router-dom';

const App = (
  <Router>
    <div>
      <AppBar position="static">
        <Box
          boxShadow={2}
        >
          <Toolbar style={{ backgroundColor: '#00A49A' }}>
            <Typography onClick={() => window.location = '/'} variant="h6" style={{ flexGrow: 1, cursor: 'pointer'}}>
              Evote MIPA
            </Typography>
          </Toolbar>
        </Box>
      </AppBar>
      <Route exact path='/' component={Root} />
      <Route path='/:year/count/:type' component={CounterPage} />
    </div>
  </Router>
);

ReactDOM.render(App, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
