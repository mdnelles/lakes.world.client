import axios from "axios";
import localForage from "localforage";
import "../config"; // adding config for folder specific build

var thisServer = window.location.href;
var serverPath = global.config.routerPath;
if (thisServer.includes("3000")) serverPath = global.config.devPath;

//export const userIsLoggedIn = token => {
export const getTables = async (token) => {
   try {
      const res = await axios.post(serverPath + "/code/get_tables", {
         token: token,
         caller: "CodeFunctions.getTables",
      });
      return res.data;
   } catch (err) {
      console.log("Err (catch) CodeFunctions.getTables: " + err);
      document.location.href = "/";
      return false;
   }
};

export const getColumns = async (token, table) => {
   try {
      const res = await axios.post(serverPath + "/code/get_columns", {
         token,
         table,
         caller: "CodeFunctions.getColumns",
      });
      return res.data;
   } catch (err) {
      console.log("Err (catch) CodeFunctions.getColumns: " + err);
      document.location.href = "/";
      return false;
   }
};
