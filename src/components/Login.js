import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

export const Login = () => {
   return (
      <div className='vertical-center center-outer'>
         <div className='center-inner'>
            <div className='formBox shadow_sm'>
               <div style={{ textAlign: "center", width: "100%" }}>
                  <img
                     src='./img/lakesIcon.png'
                     style={{ height: "auto", width: 100, align: "center" }}
                  />
               </div>

               <Form>
                  <FormGroup>
                     <Label for='exampleEmail'>Email</Label>
                     <Input
                        type='email'
                        name='email'
                        id='exampleEmail'
                        placeholder='with a placeholder'
                     />
                  </FormGroup>
                  <FormGroup>
                     <Label for='examplePassword'>Password</Label>
                     <Input
                        type='password'
                        name='password'
                        id='examplePassword'
                        placeholder='password placeholder'
                     />
                  </FormGroup>

                  <Button>Submit</Button>
               </Form>
            </div>
         </div>
      </div>
   );
};
