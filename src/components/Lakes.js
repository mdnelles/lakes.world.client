import React, { useState, useEffect } from "react";
import { getLakes } from "./LakesFunctions";
import Pagination from "react-js-pagination";
import { Button, ButtonGroup, Input, Spinner, Table } from "reactstrap";

import localForage from "localforage";
import uuid from "uuid";

// sending

export const Lakes = () => {
   const [rows, setRows] = useState([]),
      [isLoaded, setIsLoaded] = useState(false),
      [page, setPage] = useState(0),
      [rowsPerPage, setRowsPerPage] = useState(10),
      [totalRows, setTotalRows] = useState(0),
      [maxPage, setMaxPage] = useState(0),
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
               getLakes(startToken).then((data) => {
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
         <h3>Lakes</h3>
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
                        <td>Lake Name</td>
                        <td>Countries</td>
                        <td>Cont</td>
                        <td>lat/lon</td>
                        <td>Alt</td>
                        <td>SA(km/s)</td>
                        <td>Depth</td>
                        <td>Shore(km)</td>
                        <td>
                           Vol(km<sup>2</sup>)
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
                                 <td>{row.Shoreline}</td>
                                 <td>{row.Volume}</td>
                                 <td>
                                    <ButtonGroup
                                       size='sm'
                                       style={{ fontSize: ".7em" }}
                                    >
                                       <Button outline color='primary'>
                                          <span id={1}>View</span>
                                       </Button>
                                       <Button outline color='primary'>
                                          Edit
                                       </Button>
                                       <Button outline color='danger'>
                                          Delete
                                       </Button>
                                    </ButtonGroup>
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
