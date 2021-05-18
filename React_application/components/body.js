import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from './Table';
import { pxToRem, pxToVw, pxToVh } from '../utils/theme';

//Defining the body of Ui
function Body() {

    const useStyles = makeStyles((theme) => ({
        invcelst:
        {
            paddingBottom : pxToRem(30),
            paddingLeft : pxToRem(30),
            paddingRight : pxToRem(30),
            textAlign : 'left',
            letterSpacing : '0px',
            fontSize : pxToRem(30),
            fontFamily : 'Ubuntu',
            color : '#FFFFFF',
            opacity : '1',
        },
        invoice:{
            marginBottom:'pxToRem(30)',
            font: 'normal normal normal 28px/32px Ubuntu',
            height: pxToRem(31),
        },

    }));
    
    const classes = useStyles();

    return (
        <div className = {classes.invcelst} >
            <p className='{classes.invoice}'> Invoice List</p>           
           <Table/>
        </div>
    )
}

export default Body
