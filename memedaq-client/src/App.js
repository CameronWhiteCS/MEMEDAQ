import './App.css';



import axios from "axios";
import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import Home from "./components/Home";
import Signup from "./components/Signup.js";
import Signin from "./components/Signin.js";
import ErrorModal from "./components/ErrorModal.js";
import Navigation from "./components/Navigation.js";
import Profile from './components/Profile.js';
import About from './components/About.js';
import Stonks from './components/Stonks.js';
import Portfolio from './components/Portfolio.js';
import ManageMeme from './components/ManageMeme.js';
import News from './components/News.js';
import ViewArticle from './components/ViewArticle.js';
import CreateArticle from './components/CreateArticle.js';
import ControlPanel from './components/ControlPanel.js';
import EditArticle from './components/EditArticle.js';
import CreateMeme from './components/CreateMeme.js';
import ViewMeme from './components/ViewMeme.js';
import Highscores from './components/Highscores.js';


const App = () => {

  const [errorState, setErrorState] = useState({});

  const handleError = (error) => {
    if (error.response !== undefined) {
      setErrorState({
        visible: true,
        title: `Error ${error.response.status}: ${error.response.statusText}`,
        message: error.response.data
      });
    }
  };

  const [userData, setUserData] = useState({});

  const loadUserData = () => {
    axios.get('/api/v1/userdata/')
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        handleError(err);
      })
  }

  const [signedIn, setSignedIn] = useState(false);

  /* Checks to see if the client is signed in using a valid session token. */
  /* If a valid session is present, a sequence of requests is executed. */
  useEffect(() => {
    axios.get('/api/v1/session/')
      .then((res) => {
        setSignedIn(true)
        loadUserData();
      })
      .catch((err) => { })
  }, []);

  /* Styles */
  const containerStyle = {
    marginTop: "15px",
  };

  return (
    <React.Fragment>
      <Router>
        <Navigation signedIn={signedIn} userData={userData} />
        <Container style={containerStyle}>
          <ErrorModal errorState={errorState} setErrorState={setErrorState} />
          <Switch>
            <Route exact path="/signup" render={() => (<Signup handleError={handleError} setSignedIn={setSignedIn} />)} />
            <Route exact path="/signin" render={() => (<Signin handleError={handleError} setSignedIn={setSignedIn} loadUserData={loadUserData} />)} />
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/profile" render={() => <Profile userData={userData} handleError={handleError} setSignedIn={setSignedIn} />} />
            <Route exact path="/about" render={() => <About />} />
            <Route exact path="/stonks" render={() => <Stonks signedIn={signedIn} />} />
            <Route exact path="/meme/:id" render={() => <ViewMeme handleError={handleError} userData={userData} />} />
            <Route exact path="/news" render={() => <News handleError={handleError} />} />
            <Route exact path="/news/:id" render={() => <ViewArticle userData={userData} handleError={handleError} />} />
            <Route exact path="/highscores" render={() => <Highscores handleError={handleError} />} />
            {
              signedIn &&
              <React.Fragment>
                <Route exact path="/portfolio" render={() => <Portfolio setUserData={setUserData} />} />
                <Route exact path="/manage/:id" render={() => <ManageMeme userData={userData} handleError={handleError} loadUserData={loadUserData} />} />
                <Route exact path="/news/:id/edit" render={() => <EditArticle handleError={handleError} />} />
                <Route exact path="/admin" render={() => <ControlPanel />} />
                <Route exact path="/admin/article/" render={() => <CreateArticle handleError={handleError} />} />
                <Route exact path="/admin/meme/" render={() => <CreateMeme handleError={handleError} />} />
              </React.Fragment>
            }
          </Switch>
        </Container>
      </Router>
    </React.Fragment>
  );
};

export default App;
