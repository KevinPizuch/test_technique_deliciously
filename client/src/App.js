import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import LoginModal from "./components/LoginModal";
import RegisterModal from "./components/RegisterModal";
import Home from "./components/Home";
import BoardAdmin from "./components/BoardAdmin";

const App = () => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [loginModalShow, setLoginModalShow] = useState(false);
  const [signInModalShow, setSignInModalShow] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <a href="/home" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <p className="nav-link" onClick={() => setLoginModalShow(true)}>Log In</p>
            </li>

            <li className="nav-item">
              <p className="nav-link" onClick={() => setSignInModalShow(true)}>Sign Up</p>
            </li>
          </div>
        )}
      </nav>

      <>
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route path="/admin" component={BoardAdmin} />
        </Switch>
      </>
      <LoginModal
        show={loginModalShow}
        onHide={() => setLoginModalShow(false)}
      />
       <RegisterModal
        show={signInModalShow}
        onHide={() => setSignInModalShow(false)}
      />
    </div>
  );
};

export default App;