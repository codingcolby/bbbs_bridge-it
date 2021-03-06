import React, { Component } from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import { connect } from "react-redux";

import Nav from "../Nav/Nav";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
// PAGE COMPONENTS
import AboutPage from "../AboutPage/AboutPage";
import AdminPage from "../../pages/AdminPage/AdminPage";
import InfoPage from "../InfoPage/InfoPage";
import LandingPage from "../../pages/LandingPage/LandingPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import MapSearchPage from "../../pages/MapSearchPage/MapSearchPage";
import MapListPage from "../../pages/MapListPage/MapListPage";
import MatchTablePage from "../../pages/MatchTablePage/MatchTablePage";
import SearchPage from "../../pages/SearchPage/SearchPage";
import UploadPage from "../../pages/UploadPage/UploadPage";

import "./App.css";

// MATERIAL-UI KIT PAGES

import KitLandingPage from "../../material-kit/views/LandingPage/LandingPage.js";
import KitProfilePage from "../../material-kit/views/ProfilePage/ProfilePage.js";
import KitLoginPage from "../../material-kit/views/LoginPage/LoginPage.js";

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: "FETCH_USER" });
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Nav />
            <Switch>
              {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
              <Redirect exact from="/" to="/login" />
              {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
              <ProtectedRoute exact path="/about" component={AboutPage} />
              <ProtectedRoute exact path="/home" component={LandingPage} />
              <ProtectedRoute exact path="/map" component={MapSearchPage} />
              <ProtectedRoute exact path="/list/:id" component={MapListPage} />
              <ProtectedRoute exact path="/table" component={MatchTablePage} />

              <ProtectedRoute exact path="/search" component={SearchPage} />
              <ProtectedRoute exact path="/admin" component={AdminPage} />
              <ProtectedRoute exact path="/upload" component={UploadPage} />

              <ProtectedRoute exact path="/kitlogin" component={KitLoginPage} />
              <ProtectedRoute
                exact
                path="/kitlanding"
                component={KitLandingPage}
              />
              <ProtectedRoute
                exact
                path="/kitprofile"
                component={KitProfilePage}
              />
              {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
              {/* <ProtectedRoute exact path="/admin" component={UserPage} /> */}
              {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
              <ProtectedRoute exact path="/info" component={InfoPage} />
              {/* This works the same as the other protected route, except that if the user is logged in,
            they will be redirected to the authRedirect path provided. */}
              <ProtectedRoute
                exact
                path="/login"
                authRedirect="/admin"
                component={LoginPage}
              />
              <ProtectedRoute
                exact
                path="/registration"
                authRedirect="/admin"
                component={RegisterPage}
              />

              {/* If none of the other routes matched, we will show a 404. */}
              <Route render={() => <h1>404</h1>} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default connect()(App);
