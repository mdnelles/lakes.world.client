import React, { useState, useEffect } from "react";
import { getLakes } from "./LakesFunctions";
import { Button, ButtonGroup, ButtonToolbar, Spinner, Table } from "reactstrap";
import localForage from "localforage";
import uuid from "uuid";

export const Lakes = (props) => {
   console.log("ent");
   const [rows, setRows] = useState([]),
      [isLoaded, setIsLoaded] = React.useState(false),
      [page, setPage] = React.useState(0),
      [open, setOpen] = React.useState(false),
      [rowsPerPage, setRowsPerPage] = React.useState(10);

   const handleClose = () => {
      setOpen(false);
   };

   const handleChangePage = (event, newPage) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
   };

   useEffect(() => {
      //loading Api Data"
      if (isLoaded === false) {
         getLakes(props.myToken).then((data) => {
            console.log("data:");
            console.log(data);
            //setRows(data[0]);
            setIsLoaded(true);
            // "Countries loaded"
         });
      }
   }, []);

   return (
      <div id='main' className='body'>
         <h3>Lakes</h3>
         <div style={{ padding: 25, display: "block" }}></div>
         <div className='contain' style={{ marginLeft: 10 }}>
            {/* msg goes here */}

            {/* */}
         </div>
         <div style={{ padding: 15, display: "block" }}></div>
         {isLoaded === false ? (
            <Spinner size='sm' color='primary' />
         ) : (
            <div className='paperStyle'>
               <Table>
                  <thead>
                     <tr>
                        <td>location</td>
                        <td>Date</td>
                        <td>Lon</td>
                        <td>Lat</td>
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
                                 <td>{row.ci + "," + row.ps + "," + row.co}</td>
                                 <td>{row.date}</td>
                                 <td>{row.lon}</td>
                                 <td>{row.lat}</td>
                                 <td>
                                    <ButtonGroup
                                       size='small'
                                       color='primary'
                                       variant='contained'
                                       aria-label='small primary button group'
                                    >
                                       <Button>
                                          <span id={1}>View</span>
                                       </Button>

                                       <Button>Delete</Button>
                                    </ButtonGroup>
                                 </td>
                              </tr>
                           );
                        })}
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
