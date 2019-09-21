import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
//Components
import NavBar from './components/NavBar';
//Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#534bae',
      main: '#1a237e',
      dark: '#000051',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#efefef',
      main: '#bdbdbd',
      dark: '#8d8d8d',
      contrastText: '#000000'
    }
  },
  typography: { useNextVariants: true }
});

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