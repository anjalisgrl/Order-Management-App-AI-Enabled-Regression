import {  makeStyles,Grid } from "@material-ui/core";
import React from "react";

import logo from '../assets/logo.svg';
import Group__20399 from '../assets/MainLogo.png';
import { pxToRem,pxToVw,pxToVh } from "../utils/theme";
const useStyles = makeStyles(() => ({
    
  "@global": {

    html: {
      fontSize: "calc(0.75vh + 0.75vw)",
     
    }
  },

logoABC: {
    marginLeft: pxToVw(30),
    
    height: pxToVh(30),
    width: pxToVw(180),
    background: "0% 0% no-repeat padding-box",
    opacity: 1,
},
logoHRC: {
    display: "inline",
    marginTop:pxToVh(15),
    marginLeft: pxToVw(350),   
    height: pxToVh(35),
    width: pxToVw(200),
    background: "transparent 0% 0% no-repeat padding-box",
    opacity: 1,
},

}));

//Creating Header 
function Header() {

    const { header, logoABC, logoHRC } = useStyles();

  return (

<Grid container spacing={0}>
    <Grid item xs={12}>
        <div className="header"> 
            <img src={Group__20399} className={logoABC} alt="Group__20399" />
            <img src={logo} className={logoHRC} alt="logo" />
        </div>
    </Grid>

</Grid>
  );

}

export default Header
