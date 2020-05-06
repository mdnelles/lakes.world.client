import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

// AppWrapper protects Admin Panel from non sessioned access
import { AppWrapper } from "./AppWrapper";
import { Login } from "./components/Login";
import { Loading } from "./components/Loading";
import { Index } from "./components/Index";

const App = () => {
   return (
      <div className='App'>
         <Router>
            <Switch>
               <Route exact path='/login' component={Login} />
               <Route exact path='/' component={Index} />
               <Route exact path='/loading' component={Loading} />
               <Route exact path='/admin' component={AppWrapper} />
               <Route exact path='/logs' component={AppWrapper} />
            </Switch>
         </Router>
      </div>
   );
};

export default App;
