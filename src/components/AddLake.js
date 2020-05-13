import React, { useState, useEffect } from "react";
import { getLakes } from "./LakesFunctions";
import Pagination from "react-js-pagination";
import {
   Button,
   ButtonGroup,
   Col,
   Form,
   FormGroup,
   Label,
   Input,
   Spinner,
   Table,
} from "reactstrap";

import localForage from "localforage";
import uuid from "uuid";

// sending

export const AddLake = () => {
   const [id, setId] = useState("");
   const [lName, setLName] = useState("");
   const [lNameAlias, setLNameAlias] = useState("");
   const [countries, setCountries] = useState("");
   const [continent, setContinent] = useState("");
   const [Lat, setLat] = useState("");
   const [Lon, setLon] = useState("");
   const [gLat, setGLat] = useState("");
   const [gLon, setGLon] = useState("");
   const [gMapZoom, setGMapZoom] = useState("");
   const [Altitude, setAltitude] = useState("");
   const [SurfaceArea, setSurfaceArea] = useState("");
   const [maxDepth, setMaxDepth] = useState("");
   const [MeanDepth, setMeanDepth] = useState("");
   const [Volume, setVolume] = useState("");
   const [Shoreline, setShoreline] = useState("");
   const [catchmentArea, setCatchmentArea] = useState("");
   const [residenceTime, setResidenceTime] = useState("");
   const [frozenPeriods, setFrozenPeriods] = useState("");
   const [frozenMonths, setFrozenMonths] = useState("");
   const [mixingType, setMixingType] = useState("");
   const [morphDam, setMorphDam] = useState("");
   const [relatedInfo, setRelatedInfo] = useState("");
   const [ilecCode, setIlecCode] = useState("");
   const [description, setDescription] = useState("");
   const [gMapsLink, setGMapsLink] = useState("");
   const [img, setImg] = useState("");
   const [settlements, setSettlements] = useState("");
   const [age, setAge] = useState("");
   const [origin, setOrigin] = useState("");
   const [fishSpecies, setFishSpecies] = useState("");
   const [other1, setOther1] = useState("");
   const [lakeID, setLakeID] = useState("");
   const [other3, setOther3] = useState("");
   const [other4, setOther4] = useState("");
   const [beenCounted, setBeenCounted] = useState("");

   return (
      <div>
         <div style={{ margin: 20 }}>
            <h3>Add Lake</h3>
            <Form>
               <FormGroup row>
                  <Label for='inpid' sm={2}>
                     Id
                  </Label>
                  <Col sm={10}>
                     <Input
                        id='inpid'
                        type='input'
                        placeholder=''
                        onChange={(event) => setId(event.target.value)}
                     />
                  </Col>
               </FormGroup>
               <FormGroup row>
                  <Label for='inplName' sm={2}>
                     LName
                  </Label>
                  <Col sm={10}>
                     <Input
                        id='inplName'
                        type='input'
                        placeholder=''
                        onChange={(event) => setLName(event.target.value)}
                     />
                  </Col>
               </FormGroup>
               <FormGroup row>
                  <Label for='inplNameAlias' sm={2}>
                     LNameAlias
                  </Label>
                  <Col sm={10}>
                     <Input
                        id='inplNameAlias'
                        type='input'
                        placeholder=''
                        onChange={(event) => setLNameAlias(event.target.value)}
                     />
                  </Col>
               </FormGroup>
               <FormGroup row>
                  <Label for='inpcountries' sm={2}>
                     Countries
                  </Label>
                  <Col sm={10}>
                     <Input
                        id='inpcountries'
                        type='input'
                        placeholder=''
                        onChange={(event) => setCountries(event.target.value)}
                     />
                  </Col>
               </FormGroup>
               <FormGroup row>
                  <Label for='inpcontinent' sm={2}>
                     Continent
                  </Label>
                  <Col sm={10}>
                     <Input
                        id='inpcontinent'
                        type='input'
                        placeholder=''
                        onChange={(event) => setContinent(event.target.value)}
                     />
                  </Col>
               </FormGroup>
               <FormGroup row>
                  <Label for='inpLat' sm={2}>
                     Lat
                  </Label>
                  <Col sm={10}>
                     <Input
                        id='inpLat'
                        type='input'
                        placeholder=''
                        onChange={(event) => setLat(event.target.value)}
                     />
                  </Col>
               </FormGroup>
               <FormGroup row>
                  <Label for='inpLon' sm={2}>
                     Lon
                  </Label>
                  <Col sm={10}>
                     <Input
                        id='inpLon'
                        type='input'
                        placeholder=''
                        onChange={(event) => setLon(event.target.value)}
                     />
                  </Col>
               </FormGroup>
               <FormGroup row>
                  <Label for='inpgLat' sm={2}>
                     GLat
                  </Label>
                  <Col sm={10}>
                     <Input
                        id='inpgLat'
                        type='input'
                        placeholder=''
                        onChange={(event) => setGLat(event.target.value)}
                     />
                  </Col>
               </FormGroup>
               <FormGroup row>
                  <Label for='inpgLon' sm={2}>
                     GLon
                  </Label>
                  <Col sm={10}>
                     <Input
                        id='inpgLon'
                        type='input'
                        placeholder=''
                        onChange={(event) => setGLon(event.target.value)}
                     />
                  </Col>
               </FormGroup>
               <FormGroup row>
                  <Label for='inpgMapZoom' sm={2}>
                     GMapZoom
                  </Label>
                  <Col sm={10}>
                     <Input
                        id='inpgMapZoom'
                        type='input'
                        placeholder=''
                        onChange={(event) => setGMapZoom(event.target.value)}
                     />
                  </Col>
               </FormGroup>
               <FormGroup row>
                  <Label for='inpAltitude' sm={2}>
                     Altitude
                  </Label>
                  <Col sm={10}>
                     <Input
                        id='inpAltitude'
                        type='input'
                        placeholder=''
                        onChange={(event) => setAltitude(event.target.value)}
                     />
                  </Col>
               </FormGroup>
               <FormGroup row>
                  <Label for='inpSurfaceArea' sm={2}>
                     SurfaceArea
                  </Label>
                  <Col sm={10}>
                     <Input
                        id='inpSurfaceArea'
                        type='input'
                        placeholder=''
                        onChange={(event) => setSurfaceArea(event.target.value)}
                     />
                  </Col>
               </FormGroup>
               <FormGroup row>
                  <Label for='inpmaxDepth' sm={2}>
                     MaxDepth
                  </Label>
                  <Col sm={10}>
                     <Input
                        id='inpmaxDepth'
                        type='input'
                        placeholder=''
                        onChange={(event) => setMaxDepth(event.target.value)}
                     />
                  </Col>
               </FormGroup>
               <FormGroup row>
                  <Label for='inpMeanDepth' sm={2}>
                     MeanDepth
                  </Label>
                  <Col sm={10}>
                     <Input
                        id='inpMeanDepth'
                        type='input'
                        placeholder=''
                        onChange={(event) => setMeanDepth(event.target.value)}
                     />
                  </Col>
               </FormGroup>
               <FormGroup row>
                  <Label for='inpVolume' sm={2}>
                     Volume
                  </Label>
                  <Col sm={10}>
                     <Input
                        id='inpVolume'
                        type='input'
                        placeholder=''
                        onChange={(event) => setVolume(event.target.value)}
                     />
                  </Col>
               </FormGroup>
               <FormGroup row>
                  <Label for='inpShoreline' sm={2}>
                     Shoreline
                  </Label>
                  <Col sm={10}>
                     <Input
                        id='inpShoreline'
                        type='input'
                        placeholder=''
                        onChange={(event) => setShoreline(event.target.value)}
                     />
                  </Col>
               </FormGroup>
               <FormGroup row>
                  <Label for='inpcatchmentArea' sm={2}>
                     CatchmentArea
                  </Label>
                  <Col sm={10}>
                     <Input
                        id='inpcatchmentArea'
                        type='input'
                        placeholder=''
                        onChange={(event) =>
                           setCatchmentArea(event.target.value)
                        }
                     />
                  </Col>
               </FormGroup>
               <FormGroup row>
                  <Label for='inpresidenceTime' sm={2}>
                     ResidenceTime
                  </Label>
                  <Col sm={10}>
                     <Input
                        id='inpresidenceTime'
                        type='input'
                        placeholder=''
                        onChange={(event) =>
                           setResidenceTime(event.target.value)
                        }
                     />
                  </Col>
               </FormGroup>
               <FormGroup row>
                  <Label for='inpfrozenPeriods' sm={2}>
                     FrozenPeriods
                  </Label>
                  <Col sm={10}>
                     <Input
                        id='inpfrozenPeriods'
                        type='input'
                        placeholder=''
                        onChange={(event) =>
                           setFrozenPeriods(event.target.value)
                        }
                     />
                  </Col>
               </FormGroup>
               <FormGroup row>
                  <Label for='inpfrozenMonths' sm={2}>
                     FrozenMonths
                  </Label>
                  <Col sm={10}>
                     <Input
                        id='inpfrozenMonths'
                        type='input'
                        placeholder=''
                        onChange={(event) =>
                           setFrozenMonths(event.target.value)
                        }
                     />
                  </Col>
               </FormGroup>
               <FormGroup row>
                  <Label for='inpmixingType' sm={2}>
                     MixingType
                  </Label>
                  <Col sm={10}>
                     <Input
                        id='inpmixingType'
                        type='input'
                        placeholder=''
                        onChange={(event) => setMixingType(event.target.value)}
                     />
                  </Col>
               </FormGroup>
               <FormGroup row>
                  <Label for='inpmorphDam' sm={2}>
                     MorphDam
                  </Label>
                  <Col sm={10}>
                     <Input
                        id='inpmorphDam'
                        type='input'
                        placeholder=''
                        onChange={(event) => setMorphDam(event.target.value)}
                     />
                  </Col>
               </FormGroup>
               <FormGroup row>
                  <Label for='inprelatedInfo' sm={2}>
                     RelatedInfo
                  </Label>
                  <Col sm={10}>
                     <Input
                        id='inprelatedInfo'
                        type='input'
                        placeholder=''
                        onChange={(event) => setRelatedInfo(event.target.value)}
                     />
                  </Col>
               </FormGroup>
               <FormGroup row>
                  <Label for='inpilecCode' sm={2}>
                     IlecCode
                  </Label>
                  <Col sm={10}>
                     <Input
                        id='inpilecCode'
                        type='input'
                        placeholder=''
                        onChange={(event) => setIlecCode(event.target.value)}
                     />
                  </Col>
               </FormGroup>
               <FormGroup row>
                  <Label for='inpdescription' sm={2}>
                     Description
                  </Label>
                  <Col sm={10}>
                     <Input
                        id='inpdescription'
                        type='input'
                        placeholder=''
                        onChange={(event) => setDescription(event.target.value)}
                     />
                  </Col>
               </FormGroup>
               <FormGroup row>
                  <Label for='inpgMapsLink' sm={2}>
                     GMapsLink
                  </Label>
                  <Col sm={10}>
                     <Input
                        id='inpgMapsLink'
                        type='input'
                        placeholder=''
                        onChange={(event) => setGMapsLink(event.target.value)}
                     />
                  </Col>
               </FormGroup>
               <FormGroup row>
                  <Label for='inpimg' sm={2}>
                     Img
                  </Label>
                  <Col sm={10}>
                     <Input
                        id='inpimg'
                        type='input'
                        placeholder=''
                        onChange={(event) => setImg(event.target.value)}
                     />
                  </Col>
               </FormGroup>
               <FormGroup row>
                  <Label for='inpsettlements' sm={2}>
                     Settlements
                  </Label>
                  <Col sm={10}>
                     <Input
                        id='inpsettlements'
                        type='input'
                        placeholder=''
                        onChange={(event) => setSettlements(event.target.value)}
                     />
                  </Col>
               </FormGroup>
               <FormGroup row>
                  <Label for='inpage' sm={2}>
                     Age
                  </Label>
                  <Col sm={10}>
                     <Input
                        id='inpage'
                        type='input'
                        placeholder=''
                        onChange={(event) => setAge(event.target.value)}
                     />
                  </Col>
               </FormGroup>
               <FormGroup row>
                  <Label for='inporigin' sm={2}>
                     Origin
                  </Label>
                  <Col sm={10}>
                     <Input
                        id='inporigin'
                        type='input'
                        placeholder=''
                        onChange={(event) => setOrigin(event.target.value)}
                     />
                  </Col>
               </FormGroup>
               <FormGroup row>
                  <Label for='inpfishSpecies' sm={2}>
                     FishSpecies
                  </Label>
                  <Col sm={10}>
                     <Input
                        id='inpfishSpecies'
                        type='input'
                        placeholder=''
                        onChange={(event) => setFishSpecies(event.target.value)}
                     />
                  </Col>
               </FormGroup>
               <FormGroup row>
                  <Label for='inpother1' sm={2}>
                     Other1
                  </Label>
                  <Col sm={10}>
                     <Input
                        id='inpother1'
                        type='input'
                        placeholder=''
                        onChange={(event) => setOther1(event.target.value)}
                     />
                  </Col>
               </FormGroup>
               <FormGroup row>
                  <Label for='inplakeID' sm={2}>
                     LakeID
                  </Label>
                  <Col sm={10}>
                     <Input
                        id='inplakeID'
                        type='input'
                        placeholder=''
                        onChange={(event) => setLakeID(event.target.value)}
                     />
                  </Col>
               </FormGroup>
               <FormGroup row>
                  <Label for='inpother3' sm={2}>
                     Other3
                  </Label>
                  <Col sm={10}>
                     <Input
                        id='inpother3'
                        type='input'
                        placeholder=''
                        onChange={(event) => setOther3(event.target.value)}
                     />
                  </Col>
               </FormGroup>
               <FormGroup row>
                  <Label for='inpother4' sm={2}>
                     Other4
                  </Label>
                  <Col sm={10}>
                     <Input
                        id='inpother4'
                        type='input'
                        placeholder=''
                        onChange={(event) => setOther4(event.target.value)}
                     />
                  </Col>
               </FormGroup>
               <FormGroup row>
                  <Label for='inpbeenCounted' sm={2}>
                     BeenCounted
                  </Label>
                  <Col sm={10}>
                     <Input
                        id='inpbeenCounted'
                        type='input'
                        placeholder=''
                        onChange={(event) => setBeenCounted(event.target.value)}
                     />
                  </Col>
               </FormGroup>
            </Form>
         </div>
      </div>
   );
};
