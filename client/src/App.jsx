import React from "react";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import M from "materialize-css/dist/js/materialize.min.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import "./App.css";
import Home from "./pages/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import { loadUser } from "./actions/authActions";
import authToken from "./utils/authToken";

if (localStorage.token_softball) {
  authToken(localStorage.token_softball);
}

const App = () => {
  React.useEffect(() => {
    M.AutoInit();
    store.dispatch(loadUser());
    //eslint-disable-next-line
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Signup} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
