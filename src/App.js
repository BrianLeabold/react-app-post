import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './util/theme';

//Components
import NavBar from './components/NavBar';
//Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

const theme = createMuiTheme(themeFile);
const token = localStorage.cbIdToken;


class App extends Component {

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        < div className="App" >
          <Router>
            <NavBar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home}></Route>
                <Route exact path="/login" component={login}></Route>
                <Route exact path="/signup" component={signup}></Route>
              </Switch>
            </div>
          </Router>

        </div >
      </MuiThemeProvider>
    );
  }
}
export default App;