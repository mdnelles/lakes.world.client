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

const createAddFormBootstrap = (arr) => {
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
   <FormGroup row>
      <Label for="inp${e.Field}" sm={2}>${capFirstLet(e.Field)}</Label>
      <Col sm={10}>
        <Input id="inp${
           e.Field
        }" type="input" placeholder="" onChange={event => set${capFirstLet(
         e.Field
      )}(event.target.value)} />
      </Col>
    </FormGroup>`;
   });
   return states + "\n\n" + "<Form>" + forms + "</Form>";
};
const createAddFormMaterial = (arr) => {
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
const createMVC = (arr, table) => {
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
const createSQLAdd = (arr, table) => {
   //INSERT INTO `contentLinks` (`id`, `lakeID`, `other2`, `other3`) VALUES (NULL, '');
   let bit = "",
      columns = "",
      values = "",
      declare1 = "",
      temp = `INSERT INTO ${table} 
      (__cols__
      ) VALUES (__vals__
      ); `;

   arr.forEach((e, i) => {
      columns += "\n\t" + `'${e.Field}',`;
      values += "\n\t" + `'\${${e.Field}}',`;
      declare1 += "\n" + `let ${e.Field} = req.body.${e.Field};`;
   });
   values = values.substring(0, values.length - 1); // remove trailing ,
   columns = columns.substring(0, columns.length - 1); // remove trailing ,
   let result =
      declare1 +
      "\n`" +
      temp.replace("__cols__", columns).replace("__vals__", values) +
      "`";

   return result;
};
const creatSQLModelAdd = (arr, table) => {
   let declare = "";
   let model = table.replace(/^./, (str) => str.toUpperCase());
   let temp = `
   const ${model} require('../models/${model}'),

   const ${table}Data = { __data__
   }   

   ${model}.create(${table}Data)
      .then(data => {
         res.json({ querySuccess: true });
      })
      .catch(err => {
         res.json({ querySuccess: false, err:err });
         console.log( __filename + ' Error: ' + err)
      })
   });
   `;
   arr.forEach((e, i) => {
      declare += "\n\t" + ` ${e.Field} = req.body.${e.Field},`;
   });
   declare = declare.substring(0, declare.length - 1);
   let result = temp.replace("__data__", declare);

   return result;
};
const createSQLUpdate = (arr, table) => {
   let sets = "",
      declare1 = "",
      data = "\n\nlet data = [__data__]",
      d = "";
   let model = table.replace(/^./, (str) => str.toUpperCase());
   let temp = `UPDATE ${table} SET __sets__ WHERE __condition LIMIT 1`;
   arr.forEach((e, i) => {
      sets += "\n\t" + ` ${e.Field} = ?,`;
      d += `${e.Field},`;
      declare1 += "\n" + `let ${e.Field} = req.body.${e.Field};`;
   });
   d = d.substring(0, d.length - 1);
   let result =
      declare1 +
      "\n\n" +
      temp.replace("__sets__", sets) +
      "\n" +
      data.replace("__data__", d);

   return result;
};
const creatSQLModelUpdate = (arr, table) => {
   let upd = "";
   let declare1 = "";
   let model = table.replace(/^./, (str) => str.toUpperCase());
   let temp = `
   const ${model} require('../models/${model}'),

   ${model}.update(
      {__upd__
      },
      { where : { id : id }},
      { limit : 1 })
      .then(data=>{
         res.json({ querySuccess: true, err:err });
         console.log( 'query successful ' + data)
      })
      .catch(err => {
         res.json({ querySuccess: false, err:err });
         console.log( __filename + ' Error: ' + err)
      })
   });
   `;
   arr.forEach((e, i) => {
      upd += "\n\t" + ` ${e.Field}: ${e.Field},`;
      declare1 += "\n" + `let ${e.Field} = req.body.${e.Field};`;
   });
   upd = upd.substring(0, upd.length - 1);
   let result = declare1 + "\n\n" + temp.replace("__upd__", upd);

   return result;
};

export const CodeBuilder = () => {
   const [isLoaded, setIsLoaded] = useState(false),
      [tableList, setTableList] = useState([]),
      [typeClass, setTypeClass] = useState("displayNone"),
      [thisTable, setThisTable] = useState(""),
      [myCode, setMyCode] = useState(""),
      [myToken, setMyToken] = useState("na");

   const step1 = (event) => {
      setTypeClass("displayBlock");
      setThisTable(event.target.value);
   };
   const actionChange = (event) => {
      console.log(event.target.value);
      let res = event.target.value;
      getColumns(myToken, thisTable).then((obj) => {
         let arr = obj.data[0];
         if (res === "1") {
            //create Model
            setMyCode(createMVC(arr, thisTable));
         } else if (res === "2") {
            // Create add Bootstrap
            setMyCode(createAddFormBootstrap(arr, thisTable));
         } else if (res === "3") {
            // create Add Material
            setMyCode(createAddFormMaterial(arr, thisTable));
         } else if (res === "4") {
            //
            setMyCode(createSQLAdd(arr, thisTable));
         } else if (res === "5") {
            //
            setMyCode(createSQLUpdate(arr, thisTable));
         } else if (res === "6") {
            //
            setMyCode(creatSQLModelAdd(arr, thisTable));
         } else if (res === "7") {
            //
            setMyCode(creatSQLModelUpdate(arr, thisTable));
         } else if (res === "8") {
            //
            //setMyCode(createAddFormMaterial(arr, thisTable));
         }
      });
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
               <option value='0'>Select...</option>
               <option value='1'>Create MVC Model</option>
               <option value='2'>Create Add Form Bootstrap</option>
               <option value='3'>Create Add Form Material</option>
               <option value='4'>SQL Add</option>
               <option value='5'>SQL UPDATE</option>
               <option value='6'>SQL Model Add</option>
               <option value='7'>SQL Model Update</option>
            </Input>
            <br></br>
            <pre>{myCode}</pre>
         </div>
      </div>
   );
};
