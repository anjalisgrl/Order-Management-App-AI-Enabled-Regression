import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import React from 'react';
import Delete from './Delete';
import Edit from './Edit';
import VCmodal from './VCmodal';
import ModalADD from './ModalAdd';
import SearchBar from './SearchBar';
import { pxToRem, pxToVw, pxToVh } from '../utils/theme';

//Calling the different buttons here
export default function Buttons()
{
    const useStyles = makeStyles((theme) => ({
        root: {
            display: "flex",
            flexGrow: 1,
          },
        predict:
        {
            variant: 'contained',
            disableRipple: 'true',
            marginLeft:pxToRem(20),
            marginTop:pxToRem(30),
            marginBottom:pxToRem(30),
            height: pxToRem(55),
            width: pxToVw(86), 
            fontSize:pxToRem(20),  
            fontFamily: 'Ubuntu',
            color: '#FFFFFF',
            background: '#97A1A9 0% 0% no-repeat padding-box',
            borderRadius: pxToRem(10),
            textTransform: 'none',
            letterSpacing: '0px',
            '&:hover': {
                backgroundColor: '#5daae0',
                color: 'white',
            }
        },

    }));
    const classes = useStyles();
    return (
            <Toolbar>
                <Button className={classes.predict} >Predict</Button>
                <VCmodal />
                <ModalADD/>
                <Edit />    
                <Delete />
                <SearchBar />
            </Toolbar>  
    )
}