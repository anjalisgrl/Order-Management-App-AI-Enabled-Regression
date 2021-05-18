import React from "react";
import { withStyles,makeStyles,Button,Dialog,
          IconButton,Typography,Grid } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";
import RemoveIcon from '@material-ui/icons/Remove' ;
import  { useState } from "react";
import axios from "axios";
import { useDispatch } from 'react-redux'
import { deleteOrders } from './../actions/Curdaction';
import { useSelector } from "react-redux";
import { pxToRem, pxToVw, pxToVh } from '../utils/theme';


const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    backgroundColor:"#2A3F4D",
    color:'white'
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: '#2A3F4D',
    color: "white"
  }
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({

  root: {
    margin: 0,
    padding: theme.spacing(1),
    backgroundColor: '#2A3F4D'
  },

}))(MuiDialogActions);

export default function DeleteDialogs(props) {
  console.log(props.selected);
  
  const [data, setData] = useState([]);  
  const dispatch = useDispatch();
  const selected = useSelector((state)=>state.checked)
    let doc_id = `${selected.toString()}`;
    let values = {
        doc_id
    }
  
    const deletecustomer = (values) => {  
   
       axios.get(`http://localhost:8082/1806285/delete.do`,{params:values})  
  
        .then((response) => {  
          dispatch(deleteOrders({
            type:  'Delete',
            payload: response.data
          }));
            console.log("Successful!")
           })
           .catch(err => 
            alert(err));
  
    };  

  const [open, setOpen] = React.useState(false);

  //Handling open
  const handleClickOpen = () => {
    setOpen(true);
  };

  //Hnadling Close
  const handleClose = () => {
    setOpen(false);
  };
   
  //Hnadling delete
  const openDelete=()=>{
    console.log(values);
      deletecustomer(values);
    handleClose();
  }
  
  const useStyles= makeStyles((theme)=>({
      buttonCancelColor:{
            color:"white",
            backgroundColor:"transparent",
            border: "1px solid #14AFF1"
      },
      buttonSaveColor:{
            color:"white",
            backgroundColor:"#14AFF1"
      },
      changeDialog: {
        maxWidth : '47%', 
        maxHeight : '47%',
        display:'flex',
        justifyContent:"center",
        margin: 'auto'
      },
      spanEdit:{
          color:"#FF5E5E"
      }
      ,
  delete:
        {
            variant: 'outlined',
            disableRipple: 'true',
            marginLeft: pxToRem(20),
            height: pxToRem(55),
            width: pxToRem(123),
           
            fontSize: pxToRem(20),
            fontFamily: 'Ubuntu',
            color: '#97A1A9',
            borderRadius: pxToRem(10),
            border: '0.01rem solid #97A1A9',
            letterSpacing: 0,
            textTransform: 'none',
        },
  }))

  const classes = useStyles();
  return (
    <div>
        {/* outer button */}
      <Button className={classes.delete} variant="outlined" color="primary" onClick={handleClickOpen}>
      <RemoveIcon style={{marginBottom: '0px', fontSize: '20px' }} />
        Delete
      </Button>

      {/* dialog box body starts here */}

      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className={classes.changeDialog}
      >

        {/* Dialog box title starts here   */}
        <DialogTitle id="customized-dialog-title" onClose={handleClose} >
        <span style={{paddingLeft: '4px'}}>
          Delete record(s)?
        </span>
        </DialogTitle>

        {/* Dialog box content starts here */}

        <DialogContent dividers>
          <Typography gutterBottom>
            You'll lose your record(s) after this action. We can't recover them
            once you delete.
          </Typography>
          <Typography gutterBottom>
            Are you sure you want to <span className={classes.spanEdit}>permanently delete</span> them?
          </Typography>
        </DialogContent>

        {/* Dialog box action buttons starts here */}

        <DialogActions>
          <div>
            <Grid container spacing={2}>
              <Grid item>
                <Button autoFocus onClick={handleClose} color="primary" className={classes.buttonCancelColor}>
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="primary" className={classes.buttonSaveColor}
                onClick={openDelete}>
                  Delete
                </Button>
              </Grid>
            </Grid>

            {/* main grid ending */}

          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}