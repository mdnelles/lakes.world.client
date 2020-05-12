import React, { useState, useEffect } from "react";
import { getLogs } from "./LogsFunctions";
import Pagination from "react-js-pagination";
import { Button, ButtonGroup, Input, Spinner, Table } from "reactstrap";

import localForage from "localforage";
import uuid from "uuid";

// sending

export const Logs = () => {
   const [rows, setRows] = useState([]),
      [isLoaded, setIsLoaded] = useState(false),
      [page, setPage] = useState(0),
      [rowsPerPage, setRowsPerPage] = useState(10),
      [totalRows, setTotalRows] = useState(0),
      [myToken, setMyToken] = useState("na");

   const handlePageChange = (pageNumber) => {
      console.log(`active page is ${pageNumber}`);
      setPage(pageNumber);
   };

   useEffect(() => {
      //loading database Data"
      if (isLoaded === false) {
         localForage.getItem("myToken").then((startToken) => {
            if (isLoaded === false && myToken === "na") {
               setMyToken(startToken);
               getLogs(startToken).then((data) => {
                  if (data !== undefined) setTotalRows(data.length);
                  console.log(data);
                  setRows(data);
                  setTotalRows(data.length);
                  setIsLoaded(true);

                  console.log("length = " + data.length);
                  //setRowsPerPage(parseInt(data.length / rowsPerPage));
                  // "Countries loaded"
               });
            }
         });
      }
   }, [page, rowsPerPage]);

   return (
      <div id='main' className='paperStyle'>
         <h3>Logs</h3>
         {isLoaded === false ? (
            <Spinner size='sm' color='primary' />
         ) : (
            <div className='respTable'>
               <Table hover striped size='sm' style={{ fontSize: ".8em" }}>
                  <thead>
                     <tr
                        style={{
                           color: "#eeeeee",
                           backgroundColor: "#555555",
                           paddingBottom: "10px",
                        }}
                     >
                        <td>Filename</td>
                        <td>Function</td>
                        <td>Msg</td>
                        <td>Refer</td>
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
                                 <td>{row.filename}</td>
                                 <td>{row.fnction}</td>
                                 <td>
                                    {row.msg_programmer}
                                    <span style={{ color: "red" }}>
                                       {row.msg_app}
                                    </span>
                                 </td>
                                 <td>
                                    <span stlye={{ color: "#00D" }}>
                                       {row.refer}
                                    </span>
                                 </td>
                              </tr>
                           );
                        })}
                  </tbody>
               </Table>
               <Pagination
                  activePage={page}
                  itemsCountPerPage={rowsPerPage}
                  totalItemsCount={totalRows}
                  pageRangeDisplayed={5}
                  onChange={(event) => handlePageChange(event)}
                  itemClass='page-item'
                  linkClass='page-link'
               />
            </div>
         )}
      </div>
   );
};
