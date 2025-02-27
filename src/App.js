import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './util/theme';
//Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';
import axios from 'axios';

//Components
import NavBar from './components/layout/NavBar';
import AuthRoute from './util/AuthRoute';
//Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import user from './pages/user';

const theme = createMuiTheme(themeFile);

const token = localStorage.cbIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}


class App extends Component {

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          < div className="App" >
            <Router>
              <NavBar />
              <div className="container">
                <Switch>
                  <Route exact path="/" component={home}></Route>
                  <AuthRoute exact path="/login" component={login}></AuthRoute>
                  <AuthRoute exact path="/signup" component={signup}></AuthRoute>
                  <Route exact path="/users/:name" component={user} />
                  <Route
                    exact
                    path="/users/:name/post/:postId"
                    component={user}
                  />
                </Switch>
              </div>
            </Router>
          </div >
        </Provider>
      </MuiThemeProvider>
    );
  }
}
export default App;