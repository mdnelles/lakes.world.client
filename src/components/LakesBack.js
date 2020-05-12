import React, { useState, useEffect } from "react";
import { getLakes } from "./LakesFunctions";
import {
   Button,
   ButtonGroup,
   ButtonToolbar,
   Input,
   Pagination,
   PaginationItem,
   PaginationLink,
   Spinner,
   Table,
} from "reactstrap";

import localForage from "localforage";
import uuid from "uuid";

const Option = (props) => {
   return <option value={props.value}>{props.value}</option>;
};

export const Lakes = () => {
   const [rows, setRows] = useState([]),
      [isLoaded, setIsLoaded] = useState(false),
      [page, setPage] = useState(0),
      [rowsPerPage, setRowsPerPage] = useState(10),
      [totalRows, setTotalRows] = useState(0),
      [maxPage, setMaxPage] = useState(0),
      [myToken, setMyToken] = useState("na");

   const changePage = (event) => {
      console.log(event.target.value);
      setPage(event.target.value);
   };

   const aheadOnePage = () => {
      let t = page + 1;
      t <= maxPage ? (t = t) : (t = maxPage);
      setPage(t);
   };

   const backOnePage = () => {
      let t = page - 1;
      t < 0 ? (t = 0) : (t = t);
      setPage(t);
   };

   const changeRowsPerPage = (event) => {
      setRowsPerPage(event.target.value);
      setPage(0);
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
                  setIsLoaded(true);

                  console.log("length = " + data.length);
                  //setRowsPerPage(parseInt(data.length / rowsPerPage));
                  // "Countries loaded"
               });
            }
         });
      }
   }, [page, rowsPerPage]);

   let pageNumbers = [];
   setMaxPage(Math.ceil(totalRows / rowsPerPage));
   for (let i = 1; i < Math.ceil(totalRows / rowsPerPage); i++) {
      pageNumbers.push(i);
   }

   const rederedOptions = pageNumbers.map((number) => {
      return (
         <option key={number} id={number}>
            {number}
         </option>
      );
   });

   const renderedPages = pageNumbers.map((number) => {
      return (
         <PaginationItem>
            <PaginationLink href='#'>{number}</PaginationLink>
         </PaginationItem>
      );
   });

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
                              onChange={(event) => changeRowsPerPage(event)}
                              size='sm'
                           >
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
                              onChange={(event) => changePage(event)}
                              size='sm'
                           >
                              {rederedOptions}
                           </Input>
                        </td>

                        <td></td>
                        <td colspan='8'></td>
                     </tr>
                  </tbody>
               </Table>

               <Pagination size='sm' aria-label='Page navigation example'>
                  <PaginationItem>
                     <PaginationLink
                        first
                        href='#'
                        onClick={() => setPage(0)}
                     />
                  </PaginationItem>
                  <PaginationItem>
                     <PaginationLink
                        previous
                        href='#'
                        onClick={() => backOnePage()}
                     />
                  </PaginationItem>

                  {renderedPages}

                  <PaginationItem>
                     <PaginationLink
                        next
                        href='#'
                        onClick={() => aheadOnePage()}
                     />
                  </PaginationItem>
                  <PaginationItem>
                     <PaginationLink
                        last
                        href='#'
                        onClick={() => setPage(maxPage)}
                     />
                  </PaginationItem>
               </Pagination>
            </div>
         )}
      </div>
   );
};
