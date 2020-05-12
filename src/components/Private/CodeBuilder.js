import React, { useState } from "react";
import { getTables, getColumns } from "./CodeFunctions";

import localForage from "localforage";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import uuid from "uuid";

const Option = (props) => {
   return <option value={props.value}>{props.value}</option>;
};

function capFirstLet(string) {
   return string.charAt(0).toUpperCase() + string.slice(1);
}

const creatAddFormBootstrap = (arr) => {
   var states = "",
      forms = "";
   arr.forEach((e, i) => {
      states +=
         "\n\tconst [" +
         e.Field +
         ", set" +
         capFirstLet(e.Field) +
         "] = useState('');";

      forms += `
   <FormGroup>
      <Label for="inp${e.Field}">${capFirstLet(e.Field)}</Label>
      <Input id="inp${
         e.Field
      }" type="input" placeholder="" onChange={event => set${capFirstLet(
         e.Field
      )}(event.target.value)} />
    </FormGroup>`;
   });
   return states + "\n\n" + forms;
};
const creatAddFormMaterial = (arr) => {
   var states = "",
      forms = "";
   arr.forEach((e, i) => {
      states +=
         "\n\tconst [" +
         e.Field +
         ", set" +
         capFirstLet(e.Field) +
         "] = useState('');";

      forms += `
   <TextField id="standard-basic" label="${capFirstLet(
      e.Field
   )}" onChange={event => set${capFirstLet(e.Field)}(event.target.value)} />`;
   });
   return states + "\n\n" + forms;
};
const creatMVC = (arr, table) => {
   let bit = "",
      temp = `
   const Sequelize = require("sequelize");
   const db = require("../database/db.js");
   
   module.exports = db.sequelize.define(
      "${table}",
      { middle
      },
      {
         timestamps: false,
      }
   );   
   `;

   arr.forEach((e, i) => {
      var dataType = "",
         primaryKey = "",
         defaultValue = "",
         allowNull = "";
      e.Type.toString().includes("int")
         ? (dataType = "INTEGER")
         : (dataType = "STRING");
      e.Key !== undefined && e.Key.toString().includes("PRI")
         ? (primaryKey = "true")
         : (primaryKey = "false");
      e.Default !== null && e.Default !== undefined
         ? (defaultValue = "'" + e.Default + "'")
         : (defaultValue = '""');
      e.Null === "Yes" ? (allowNull = "true") : (allowNull = "false");
      bit += `
         ${e.Field}: {
            type: Sequelize.${dataType},
            primaryKey: ${primaryKey},
            defaultValue: ${defaultValue},
            allowNull: ${allowNull},
         },`;
   });
   let result = temp.replace("middle", bit);
   return result;
};

export const CodeBuilder = () => {
   const [isLoaded, setIsLoaded] = useState(false),
      [tableList, setTableList] = useState([]),
      [typeClass, setTypeClass] = useState("displayNone"),
      [thisTable, setThisTable] = useState(""),
      [thisAction, setThisAction] = useState(""),
      [myCode, setMyCode] = useState(""),
      [tableOptions, setTableOptions] = useState(""),
      [myToken, setMyToken] = useState("na");

   const buildCode = () => {
      let result = "";
      getColumns(myToken, thisTable).then((obj) => {
         let arr = obj.data[0];
         if (thisAction === "1") {
            //create Model
            setMyCode(creatMVC(arr, thisTable));
         } else if (thisAction === "2") {
            // Create add Bootstrap
            setMyCode(creatAddFormBootstrap(arr, thisTable));
         } else {
            // create Add Material
            setMyCode(creatAddFormMaterial(arr, thisTable));
         }
      });
   };

   const step1 = (event) => {
      setTypeClass("displayBlock");
      setThisTable(event.target.value);
   };
   const actionChange = (event) => {
      setThisAction(event.target.value);
   };
   React.useEffect(() => {
      //loading database Data"
      localForage.getItem("myToken").then((startToken) => {
         if (isLoaded === false && myToken === "na") {
            setMyToken(startToken);
            getTables(startToken).then((obj) => {
               let temp = [];
               obj.data[0].forEach((e, i) => {
                  temp.push(e.Tables_in_lakes_world);
               });

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
         <Input type='select' onChange={(event) => step1(event)}>
            <option>Select...</option>
            {tableList.map((a) => (
               <option value={a}>{a}</option>
            ))}
         </Input>
         <div className={typeClass}>
            Type of Code
            <Input type='select' onChange={(event) => actionChange(event)}>
               <option>Select...</option>
               <option value='1'>Create MVC Model</option>
               <option value='2'>Create Add Form Bootstrap</option>
               <option value='3'>Create Add Form Material</option>
            </Input>
            <br />
            <Button color='primary' onClick={() => buildCode()}>
               Build Code
            </Button>
            <br></br>
            <pre>{myCode}</pre>
         </div>
      </div>
   );
};
