import axios from "axios";
import localForage from "localforage";
import "./config"; // adding config for folder specific build

var thisServer = window.location.href;
var serverPath = global.config.routerPath;
if (thisServer.includes("3000")) serverPath = global.config.devPath;

//export const userIsLoggedIn = token => {
export const getLakes = async (token) => {
   try {
      const res = await axios.post(serverPath + "/lakes/get_lakes", {
         token: token,
         caller: __filename + ".getLakes",
      });
      return res.data;
   } catch (err) {
      console.log("Err (catch)" + __filename + ".getLakes: " + err);
      alert("moving to root");
      document.location.href = "/";
      return false;
   }
};
