import React from 'react';
import { withStyles,makeStyles, withTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from "axios";
import { pxToRem, pxToVw, pxToVh } from '../utils/theme';
import Template1 from './Template 1.js';
import Template2 from './Template 2.js';
import { useDispatch } from 'react-redux'
import { useSelector } from "react-redux";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);


export default function CustomizedDialogs() {
  const useStyles = makeStyles((theme) => ({
    corres:
        {
            variant: 'outlined',
            disableRipple: 'true',
            marginTop:pxToRem(30),
            marginBottom:pxToRem(30),
            width: pxToVw(170),
            height: pxToRem(55),
            fontSize:pxToRem(20), 
            marginLeft: pxToRem(18),
            border:`0.011rem solid #97A1A9` ,
            borderRadius: pxToRem(10),
            color:'white',
            opacity: 1,
            textTransform:'none',
            letterSpacing: 0
        },
        dialog:{
            maxWidth:'90vw',
            maxHeight:'300vh',
            background: '#2A3E4C 0% 0% no-repeat padding-box',
            color:'white',
        },
        formControl:{
          border: "white",
          height: '4.7vh',
          width: '12vw',
          marginLeft:'70vw',
          marginTop:'-7vh'
    },
        dwnldButton:{

        background: "#14AFF1 0% 0% no-repeat padding-box",
        border:"1px solid #14AFF1",
        borderRadius: pxToRem(10),
        textTransform:"None",
        color:"#FFFFFF",
        opacity: 1,
        height:pxToRem(45),
        width:pxToRem(112),
        minHeight:pxToRem(45),
        minWidth:pxToRem(92)
    },
        cancelButton:{
    
        background: "#2C404E 0% 0% no-repeat padding-box",
        textTransform:"None",
        color:"#14AFF1",
        opacity: 1,
        height:pxToRem(45),
        width:pxToRem(98),
        minHeight:pxToRem(45),
        minWidth:pxToRem(92)
        
    },
  }));
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [temp, setTemp] = React.useState("");
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [state, setState] = React.useState({
    Template: '',
    name: 'hai',
  });
  const handleChange = (event) => {
    setTemp(event.target.value);
  };
  const dispatch = useDispatch();
  const selected = useSelector((state)=>state.checked)
    let doc_id = `${selected.toString()}`;
    let values = {
        doc_id
    }
  let [responseData, setResponseData] = React.useState([]);
  const fetchData = (values) => {
    axios.get(
        `http://localhost:8082/1806285/view.do`,{params:values},
        )
      .then((response) => {
        setResponseData([...responseData, ...response.data]);
        console.log(responseData);
      })
      
      .catch((error) => {
        console.log(error);
      });
  };



  const openVC=()=>{
    console.log(values);
    handleClickOpen()
    
      fetchData(values);
  }

  const printDocumen=() =>{
    const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
        let imgWidth = 208;
        let imgHeight = canvas.height * imgWidth / canvas.width;
        const imgData = canvas.toDataURL('img/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save("download.pdf");
        })
    
  }

  return (

    <div>
      <Button className={classes.corres} variant="outlined" color="primary" onClick={openVC}>
        View Correspondence
      </Button>
      <Dialog
      classes={{
        paper: classes.dialog}} 
        onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        View Correspondence(2)
        <FormControl variant="outlined" className={classes.formControl}>
            
            View:
        <Select
          native
          
          onChange={handleChange}
          
          inputProps={{
            name: 'Template',
            id: 'outlined-age-native-simple',
          }}
        >
          <option value="Temp1" >Template 1</option>
          <option value="Temp2" >Template 2</option>
        </Select>
      </FormControl>
      
        </DialogTitle>
        <DialogContent dividers id="divToPrint" >
          {temp === "Temp2"?<Template2 responseData={responseData}/>:<Template1 responseData={responseData}/>}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} className={classes.cancelButton}>
            Cancel
          </Button>
          <Button autoFocus onClick={printDocumen} className={classes.dwnldButton}>
            Download
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
