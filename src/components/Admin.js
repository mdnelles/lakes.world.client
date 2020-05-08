import React, { useState, useEffect } from "react";
import localForage from "localforage";
import uuid from "uuid";

export const Admin = (props) => {
   console.log(props.myToken);
   console.log(props.myVar);
   //const [token, setToken] = useState('');

   useEffect(() => {}, []);

   return (
      <div id='main' className='mainbody'>
         <h5>Lakes & Wetlands Admin</h5>
         Lakes and Wetlands uses Data from UN open source database. Also uses
         weatherbit.io API
      </div>
   );
};
