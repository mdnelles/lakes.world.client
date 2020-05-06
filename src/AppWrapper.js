import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import localForage from "localforage";
import { cl } from "./components/_sharedFunctions";

import { userIsLoggedIn } from "./components/UserFunctions";
import "./App.css";

import { Logs } from "./components/Logs";
import { Admin } from "./components/Admin";

const goHome = () => {
   // putting this in to stop repaid reloading of page on '/'
   let temp,
      loc = window.location.href.toString();
   if (loc.includes(3000)) {
      temp = loc.split("3000");
      if (temp[1] !== undefined && temp[1].toString().length > 1) {
         window.location.href = "/login";
      }
   } else {
      // this is for prodcution if it is residing on a domain
      loc = loc.replace("https://", "").replace("http://", "");
      if (loc.includes("/")) {
         temp = loc.split("/");
         if (temp[1] !== undefined && temp[1].toString().length > 1) {
            window.location.href = "/";
         }
      }
   }
};

export const AppWrapper = () => {
   const [activeSession, setActiveSession] = useState("loading");

   useEffect(() => {
      // pnl
      localForage
         .getItem("token", function (err, theToken) {
            if (err) {
               cl("token err -> " + err);
            } else {
               userIsLoggedIn(theToken)
                  .then((data) => {
                     data === true || data === "true"
                        ? setActiveSession("ok")
                        : goHome();
                  })
                  .catch((err) => {
                     cl("user is not logged in " + err);
                     goHome();
                  });
            }
         })
         .catch((err) => {
            cl("user is not logged in " + err);
            goHome();
         });
   }, []);

   var ret = "";
   if (activeSession === "no") {
      cl("AppWRapper.js.no active session routing to login page");
      ret = <Redirect to='/login' />;
   } else {
      ret = (
         <div>
            <div>
               <Route exact path='/admin' component={Admin} />
               <Route exact path='/logs' component={Logs} />
            </div>
         </div>
      );
   }

   return ret;
};
