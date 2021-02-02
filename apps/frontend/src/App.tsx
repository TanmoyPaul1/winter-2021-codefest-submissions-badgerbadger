<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Filters from "./components/Filters";
import Login from "./pages/Login";
import Register from "./pages/Register";
=======

import Navbar from "./components/Navbar";
import Search from "./pages/Search";
import Login from "./pages/Login"
import Register from "./pages/Register"
>>>>>>> upstream/main
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useState } from "react";
import { TokenContext } from "./context/TokenContext";


function App() {
  const [token, setToken] = useState<string>("");
  const [loggedinUser, setLoggedin] = useState<string>("");


  return (
<<<<<<< HEAD
    // <div className="App">
    //   <pre style={{ textAlign: "left" }}>
    //     {JSON.stringify(rawdata, null, 2)}
    //   </pre>
    //   <Navbar />
    //   <Filters />
    // </div>
    <>
      <a href="/login">Login</a>
      <a href="/register">Register</a>
      <a href="/">Home</a>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <Navbar />
            {/* <Filters /> */}
          </Route>
        </Switch>
      </Router>
    </>
=======
    <TokenContext.Provider value={{ loggedinUser, setLoggedin, token, setToken}}>

    <Router>

      <Navbar />
      {token === "" &&        // if user is not logged in, use the following routes 
          <Switch>
            
            <Route path="/register">
              <Register />
            </Route>

            <Route path="/login">
              <Login />
            </Route>

            <Route path="/">
              <Redirect to="/login" />
            </Route>

          </Switch>
      }

        {token !== "" &&        // if the user is logged in, use these routes
          <Switch>

            <Route path="/search">
              <Search />
            </Route>

          <Route path="/">
            THE USER IS LOGGED IN AND USING THE LOGGED IN SWITCHES
            this route hasn't been written yet o_O
          </Route>

          </Switch>
        }




    </Router>
    </TokenContext.Provider>

>>>>>>> upstream/main
  );
}

export default App;
