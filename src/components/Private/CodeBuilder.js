import React, { useState } from "react";
import { getTables } from "./CodeFunctions";

import localForage from "localforage";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import uuid from "uuid";

const Option = (props) => {
   return <option value={props.value}>{props.value}</option>;
};

export const CodeBuilder = () => {
   const [isLoaded, setIsLoaded] = useState(false),
      [tableList, setTableList] = useState([]),
      [typeClass, setTypeClass] = useState("displayNone"),
      [tableOptions, setTableOptions] = useState(""),
      [myToken, setMyToken] = useState("na");

   const step1 = (event) => {
      setTypeClass("displayBlock");
   };

   console.log(" > CodeBuilder.js ");
   console.log(tableList);
   React.useEffect(() => {
      //loading database Data"
      localForage.getItem("myToken").then((startToken) => {
         if (isLoaded === false && myToken === "na") {
            setMyToken(startToken);
            getTables(startToken).then((obj) => {
               let temp = [];
               obj.data[0].forEach((e, i) => {
                  console.log(e.Tables_in_lakes_world);
                  temp.push(e.Tables_in_lakes_world);
               });
               console.log(temp);

               setTableList(temp);
               //makeSelect(obj.data[0]);
               if (obj.success === true) setIsLoaded(true);
               // "Countries loaded"
            });
         }
      });
   }, [tableList]);
   return (
      <div className='mainbody'>
         Select Table to generate code
         <Input type='select' name='select' onChange={(event) => step1(step1)}>
            <option>Select...</option>
            {tableList.map((a) => (
               <option value={a}>{a}</option>
            ))}
         </Input>
         <div className={typeClass}>
            Type of Code
            <Input type='select' name='select' id='exampleSelect'>
               <option>Select...</option>
               <option>Create MVC Model</option>
               <option>Create Add Form</option>
            </Input>
         </div>
      </div>
   );
};
