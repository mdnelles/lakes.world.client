import React from "react";

export const Error = () => {
   console.log("Error loc: " + window.location.href);
   return (
      <div>
         Error
         <br></br>
         <a href='/login'>login</a>
      </div>
   );
};
