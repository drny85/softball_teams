import React from "react";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import M from "materialize-css/dist/js/materialize.min.js";
import "./App.css";
import Home from "./pages/Home";

const App = () => {
  React.useEffect(() => {
    M.AutoInit();
    //eslint-disable-next-line
  }, []);
  return (
    <>
      <Home />
    </>
  );
};

export default App;
