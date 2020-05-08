import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Spinner } from "reactstrap";
import { login, getCaptchaKey } from "./UserFunctions";
import localForage from "localforage";
import Recaptcha from "react-recaptcha";

export const Login = () => {
   const [email, setEmail] = useState("mxnelles@gmail.com"),
      [password, setPassword] = useState("pass1WORD"),
      [warnClass, setWarnClass] = useState("displayNone"),
      [captchaKey, setCaptchaKey] = useState("na"),
      [submitClass, setSubmitClass] = useState("displayNone"),
      [warnMsg, setWarnMsg] = useState(""),
      [spinnerClass, setSpinnerClass] = useState("displayNone");

   const captcha = (event) => {
      console.log(event);
      setSubmitClass("displayBlock");
   };

   const submit = () => {
      setSpinnerClass("displayBlock");
      setWarnClass("displayNone");
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
            setWarnClass("displayBlock");
         }, 500);

         setWarnMsg("Please enter valid credentials");
         // find number of next up slide and then update state of Cube Wrapper to trigger roll
      } else {
         localForage.setItem("token", false); // clear old token if exists
         login(email, password)
            .then((data) => {
               if (data.tokenSuccess === true) {
                  // success: set token and move beyond Auth Wall
                  localForage.setItem("token1", data.token);
                  console.log("set token: " + data.token);

                  setTimeout(() => {
                     window.location.href = "/admin";
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

   let captchaPlace = "";
   if (captchaKey !== undefined && captchaKey !== "na") {
      captchaPlace = (
         <Recaptcha
            sitekey={captchaKey}
            render='explicit'
            verifyCallback={(event) => captcha(event)}
         />
      );
   } else {
      captchaPlace = "";
   }

   React.useEffect(() => {
      if (captchaKey === "na") {
         console.log("Login - useEffect");
         // getting the proper key based on dev or production
         // key is then inserted in to the captcha component
         getCaptchaKey().then((data) => {
            if (data !== undefined && data.length > 10) {
               setTimeout(() => {
                  setCaptchaKey(data);
               }, 200); // delay to ensure data is set
            } else {
               console.log("Err: not authorized for captch key");
            }
         });
      }
   }, [captchaKey]);

   return (
      <div className='vertical-center center-outer'>
         <div className='center-inner'>
            <div className='formBox shadow_blur'>
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
               <br />
               {captchaPlace}
               <br />
               <div className={submitClass}>
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
               </div>
               <br />
               <div className={"alert-warning " + warnClass}>{warnMsg}</div>
            </div>
         </div>
      </div>
   );
};
