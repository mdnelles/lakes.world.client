import React from "react";
import { Button, Form, FormGroup, Label, Input, Spinner } from "reactstrap";
import { login } from "./UserFunctions";
import localForage from "localforage";

export const Login = () => {
   const [email, setEmail] = React.useState("mxnelles@gmail.com"),
      [password, setPassword] = React.useState("pass1WORD"),
      [warnClass, setWarnClass] = React.useState("displayNone"),
      [warnMsg, setWarnMsg] = React.useState(""),
      [spinnerClass, setSpinnerClass] = React.useState("displayNone");

   const submit = () => {
      if (
         email === null ||
         email === undefined ||
         email === "" ||
         password === null ||
         password === undefined ||
         password === ""
      ) {
         setTimeout(() => {
            setSpinnerClass("displayNone");
         }, 500);
         setWarnClass("displayBlock");
         setWarnMsg("Please enter valid credentials");
         // find number of next up slide and then update state of Cube Wrapper to trigger roll
      } else {
         localForage.setItem("token", false); // clear old token if exists
         login(email, password)
            .then((res) => {
               console.log(res);
               if (res !== undefined) {
                  console.log("token set");
                  localForage.setItem("token", res);

                  setTimeout(() => {
                     //window.location.href = "/admin";
                  }, 350);
               } else {
                  console.log("no token found");
                  console.log("+++ unhandled error here: " + __filename);
                  setSpinnerClass("displayNone");
               }
            })
            .catch((err) => {
               console.log("+++ error in file: " + __filename + "err=" + err);
            });
      }
   };

   return (
      <div className='vertical-center center-outer'>
         <div className='center-inner'>
            <div className='formBox shadow_sm'>
               <div style={{ textAlign: "center", width: "100%" }}>
                  <img
                     src='./img/lakesIcon.png'
                     style={{ height: "auto", width: 100, align: "center" }}
                     alt='Lakes.World'
                  />
               </div>
               <div className={spinnerClass}>
                  <Spinner type='grow' color='primary' /> Working...
               </div>
               <Form>
                  <FormGroup>
                     <Label for='em'>Email</Label>
                     <Input
                        type='email'
                        id='em'
                        defaultValue={email}
                        placeholder='example@me.com'
                        onChange={(event) => setEmail(event.target.value)}
                     />
                  </FormGroup>
                  <FormGroup>
                     <Label for='pw'>Password</Label>
                     <Input
                        type='password'
                        id='pw'
                        defaultValue={password}
                        placeholder=''
                        onChange={(event) => setPassword(event.target.value)}
                     />
                  </FormGroup>

                  <Button onClick={submit}>Submit</Button>
               </Form>
               <br />
               <div className={"alert-warning " + warnClass}>{warnMsg}</div>
            </div>
         </div>
      </div>
   );
};
