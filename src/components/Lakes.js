import React, { useState, useEffect } from "react";
import { getLakes } from "./LakesFunctions";
import {
   Button,
   ButtonGroup,
   ButtonToolbar,
   Input,
   Spinner,
   Table,
} from "reactstrap";

import localForage from "localforage";
import uuid from "uuid";

export const Lakes = () => {
   const [rows, setRows] = useState([]),
      [isLoaded, setIsLoaded] = React.useState(false),
      [page, setPage] = React.useState(0),
      [open, setOpen] = React.useState(false),
      [myToken, setMyToken] = React.useState("na"),
      [rowsPerPage, setRowsPerPage] = React.useState(10);

   const handleClose = () => {
      setOpen(false);
   };

   const handleChangePage = (event, newPage) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(event.target.value);
      setPage(0);
   };

   useEffect(() => {
      //loading database Data"
      localForage.getItem("myToken").then((startToken) => {
         if (isLoaded === false && myToken === "na") {
            setMyToken(startToken);
            getLakes(startToken).then((data) => {
               console.log(data);
               setRows(data);
               setIsLoaded(true);
               // "Countries loaded"
            });
         }
      });
   }, []);

   return (
      <div id='main' className='mainbody'>
         <h3>Lakes</h3>
         <div className='contain' style={{ marginLeft: 10 }}>
            {/* msg goes here */}
         </div>
         <div style={{ padding: 15, display: "block" }}></div>
         {isLoaded === false ? (
            <Spinner size='sm' color='primary' />
         ) : (
            <div className='paperStyle'>
               <Table hover striped size='sm' style={{ fontSize: ".8em" }}>
                  <thead>
                     <tr
                        style={{
                           color: "#eeeeee",
                           backgroundColor: "#555555",
                           paddingBottom: "10px",
                        }}
                     >
                        <td>Lake Name</td>
                        <td>Countries</td>
                        <td>Cont</td>
                        <td>lat/lon</td>
                        <td>Alt</td>
                        <td>SA(km/s)</td>
                        <td>Depth</td>
                        <td>Volume</td>
                        <td>Shore(km)</td>
                        <td>
                           Vol(m<sup>2</sup>)
                        </td>
                        <td>Commands</td>
                     </tr>
                  </thead>
                  <tbody>
                     {rows
                        .slice(
                           page * rowsPerPage,
                           page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => {
                           return (
                              <tr key={uuid()}>
                                 <td>{row.lName}</td>
                                 <td>{row.countries}</td>
                                 <td>{row.continent}</td>
                                 <td>
                                    <span stlye={{ color: "#00D" }}>
                                       {row.gLat + "/" + row.gLon}
                                    </span>
                                 </td>
                                 <td>{row.Altitude}</td>
                                 <td>{row.SurfaceArea}</td>
                                 <td>{row.MaxDepth}</td>
                                 <td>{row.Volume}</td>
                                 <td>{row.Shoreline}</td>
                                 <td>{row.Volume}</td>
                                 <td>
                                    <ButtonGroup
                                       size='sm'
                                       color='secondary'
                                       style={{ fontSize: ".7em" }}
                                    >
                                       <Button color='secondary'>
                                          <span id={1}>View</span>
                                       </Button>

                                       <Button>Delete</Button>
                                    </ButtonGroup>
                                 </td>
                              </tr>
                           );
                        })}
                     <tr style={{ backgroundColor: "#a7b4f2" }}>
                        <td colspan='1'>
                           Per Page:
                           <Input
                              type='select'
                              name='select'
                              id='exampleSelect'
                              onChange={(event) =>
                                 handleChangeRowsPerPage(event)
                              }
                              size='sm'
                           >
                              <option value={5}>5</option>
                              <option value={10} Selected>
                                 10
                              </option>
                              <option value={25}>25</option>
                              <option value={50}>50</option>
                              <option value={100}>100</option>
                           </Input>
                        </td>
                        <td>
                           Goto Page:
                           <Input
                              type='select'
                              name='select'
                              id='exampleSelect'
                              onChange={(event) =>
                                 handleChangeRowsPerPage(event)
                              }
                              size='sm'
                           >
                              <option value={5}>5</option>
                              <option value={10} Selected>
                                 10
                              </option>
                              <option value={25}>25</option>
                              <option value={50}>50</option>
                              <option value={100}>100</option>
                           </Input>
                        </td>

                        <td></td>
                        <td colspan='8'></td>
                     </tr>
                  </tbody>
               </Table>
               {/*  
               <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component='div'
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
               />*/}
            </div>
         )}
      </div>
   );
};
