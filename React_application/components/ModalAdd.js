import  React from "react";
import { makeStyles, Button,Grid} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { pxToRem, pxToVw, pxToVh } from '../utils/theme';
import  { useState, useEffect } from "react";
import axios from "axios";
import { addOrders } from './../actions/Curdaction';
import { useDispatch } from 'react-redux'

const styles = makeStyles((theme) => ({

    paper:{
        
        heigth:pxToRem(100),
        width:pxToRem(1130),
        background: "#2A3E4C 0% 0% no-repeat padding-box",
        boxShadow: "0px 8px 24px #00000029",
        borderRadius: pxToRem(6),
        opacity: 1,
        overflow:"hidden"
    },

    cancelButton:{
    
        background: "#2C404E 0% 0% no-repeat padding-box",
        textTransform:"None",
        color:"#14AFF1",
        opacity: 1,
        height:pxToRem(45),
        width:pxToRem(92),
        minHeight:pxToRem(45),
        minWidth:pxToRem(92)
        
    },

    clearButton:{

        background: "#2C404E 0% 0% no-repeat padding-box",
        border:"1px solid #14AFF1",
        borderRadius: pxToRem(10),
        textTransform:"None",
        color:"#FFFFFF",
        opacity: 1,
        height:pxToRem(45),
        width:pxToRem(92),
        minHeight:pxToRem(45),
        minWidth:pxToRem(92)
    },

    addButton:{

        background: "#14AFF1 0% 0% no-repeat padding-box",
        border:"1px solid #14AFF1",
        borderRadius: pxToRem(10),
        textTransform:"None",
        color:"#FFFFFF",
        opacity: 1,
        height:pxToRem(45),
        width:pxToRem(92),
        minHeight:pxToRem(45),
        minWidth:pxToRem(92)
    },
    texts:{

        height:pxToRem(23),
        textAlign:"left",
        font: "normal normal normal Ubuntu",
        fontSize:pxToRem(20),
        letterSpacing: pxToRem(0),
        color:"#97A1A9",
        opacity: 1,
        whiteSpace:"nowrap",
        marginRight:pxToRem(15)
    },

    searchField1:{
      height:pxToRem(40),
      width:pxToRem(300),
      margin:"auto",
      borderRadius: pxToRem(8),
      flexFlow:"row nowrap"
      
  },
  
  searchField2:{
      height:pxToRem(191),
      width:pxToRem(300),
      marginLeft:pxToRem(90),
      borderRadius: pxToRem(8),
      flexFlow:"row nowrap"
      
  },
  add:{

      variant: 'outlined',
      disableRipple: 'true',
      marginLeft:pxToRem(750),
      width:pxToVw(79),
      [theme.breakpoints.down('sm')]: {
      marginLeft:pxToRem(515),
      width:pxToVw(99),
      },
[theme.breakpoints.down('xs')]: {
  marginLeft:pxToRem(285),
  width:pxToVw(130),
},
height: pxToRem(55),

paddingLeft: '2px',
fontSize: '1.056vw',
fontFamily: 'Ubuntu',
color: '#FFFFFF',
borderRadius: '0.5rem',
border: '0.01rem solid #14AFF1',
textTransform: 'none',
  },
  searchBar:{
        border: "1px solid #356680",
        borderRadius: pxToRem(8),
        width:"100%",
        height:"100%",
        opacity:1,
        backgroundColor:"#283A46",
        color:"#FFFFFF"
        
  },
  textarea:{
    width:pxToRem(270),
    height:pxToRem(170),
    backgroundColor:"#283A46",
    color:"#FFFFFF",
    border: "0.01rem solid #356680",
    borderRadius: pxToRem(8),
  
 },
}));

//Dailog box for add button
export default function AddButtonDialog(props) {
    
  const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    
    const classes = styles();

    const [customer, setcustomer] = useState({ name_customer: '',
        cust_number:'',
        doc_id: 0,
        total_open_amount: 0,
        due_in_date: new Date(),
        notes: '',
    });  

        const resetForm = () => {
        setcustomer(customer);
       
    }
    const textInput = React.useRef();


  const apiUrl = "http://localhost:8082/1806285/add.do";
  const dispatch = useDispatch();
  const Insertcustomer = (e) => {  
    e.preventDefault();   
    const data = { name_customer:customer.name_customer, 
                  cust_number: customer.cust_number, 
                  doc_id: customer.doc_id, 
                  total_open_amount: customer.total_open_amount, 
                  due_in_date:customer.due_in_date, 
                  notes: customer.notes };  

    axios.get(apiUrl,{ params: data})  
    .then((response) => {  
    
    dispatch(addOrders({
      type:  'Add',
      payload: response.data
    }));
  
    console.log("Successful!")
   })
   .catch(err => 
    console.log(err.data));
    handleClose();
  };  
 

  const onChange = (e) => {  
       e.persist();  
    
    setcustomer({...customer, [e.target.name]: e.target.value});  
    
}  
const clearState = () => {
  setcustomer({ ...customer });
};


   
return (
      <div>
        <Button onClick={handleClickOpen} className={ classes.add} variant="outlined" color="primary" disableElevation startIcon={<AddIcon />} >         
         Add
        </Button>

      <Dialog maxWidth={true}  scroll="body" open={open} onClose={handleClose} classes={{paper:classes.paper}}>
          
      <DialogTitle style={{color:"#FFFFFF"}}>
            
            <Grid container  style={{flexFLow:"row nowrap",justifyContent:"flex-start"}}>
            <Grid item >{"Add Invoice"}</Grid>
            <Grid item style={{marginLeft:pxToRem(850)}}><CloseIcon className={classes.closeIcon} onClick={handleClose}/></Grid>
            </Grid>
            
      </DialogTitle>
          
          <DialogContent dividers>
          <Grid container style={{flexFlow:"row nowrap"}} spacing={5} >
                <Grid item >
                    <Grid container style={{flexFlow:"row nowrap"}}>
                    <Grid item className={classes.texts}>Customer Name<span style={{color:"#FF5B5B"}}>*</span></Grid>
                    <Grid item className={classes.searchField1} ><input className={classes.searchBar}type="text"
                    name="name_customer"
                    ref={textInput}
                    onChange={ onChange }/></Grid>
                    </Grid><br/>
                    <Grid container style={{flexFlow:"row nowrap"}}>
                    <Grid item className={classes.texts}>Customer Number<span style={{color:"#FF5B5B"}}>*</span></Grid>
                    <Grid item className={classes.searchField1}><input className={classes.searchBar}type="text"
                    name="cust_number"
                    ref={textInput}
                    onChange={ onChange }/></Grid>
                    </Grid><br/>   
                    <Grid container style={{flexFlow:"row nowrap"}}>
                    <Grid item className={classes.texts}>Invoice Number<span style={{color:"#FF5B5B"}}>*</span></Grid>
                    <Grid item className={classes.searchField1}><input className={classes.searchBar}type="text"
                    name="doc_id"
                    onChange={ onChange }
                    ref={textInput}/></Grid>
                    </Grid><br/>      
                    <Grid container style={{flexFlow:"row nowrap"}}>
                    <Grid item className={classes.texts}>Invoice Amount<span style={{color:"#FF5B5B"}}>*</span></Grid>
                    <Grid item className={classes.searchField1}><input className={classes.searchBar}type="text"
                    name="total_open_amount"
                    onChange={ onChange }
                    ref={textInput}/></Grid>
                    </Grid>
                </Grid>
                
                <Grid item>
                    <Grid container style={{flexFlow:"row nowrap"}}>
                    <Grid item className={classes.texts}>Due Date<span style={{color:"#FF5B5B"}}>*</span></Grid>
                    <Grid item className={classes.searchField1}>
                      <input className={classes.searchBar} type="date"
                    name="due_in_date"
                    onChange={ onChange }
                    ref={textInput}/>
                    
                   
                    </Grid>
                    </Grid><br/>
                    <Grid container style={{flexFlow:"row nowrap"}}>
                    <Grid item className={classes.texts}>Notes</Grid>
                    <Grid item className={classes.searchField2}><textarea className={classes.textarea}
                    name="notes"
                    ref={textInput}
                    onChange={ onChange }/></Grid>
                    </Grid>

                </Grid>
            </Grid>
          </DialogContent>
          
          <DialogActions style={{padding:pxToRem(20)}}>
            <Grid container>
            <Button onClick={handleClose} className={classes.cancelButton}>
             Cancel
            </Button>
            </Grid>
            <Button onClick={clearState} className={classes.clearButton}>
             Clear
            </Button>

            <Button onClick={Insertcustomer} className={classes.addButton} >
              Add
            </Button>
            
          </DialogActions>
        </Dialog>
      
      </div>
    );
  }








