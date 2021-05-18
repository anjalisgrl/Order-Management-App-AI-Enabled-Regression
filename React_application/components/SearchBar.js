import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { pxToRem, pxToVw, pxToVh } from '../utils/theme';
import axios from "axios";
import { useDispatch } from 'react-redux'
import { useSelector } from "react-redux";
import { search } from './../actions/Curdaction';
import InputBase from "@material-ui/core/InputBase";
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
  },
    searchbar: {
            margin: pxToRem(theme.spacing(1)),
            display: "flex",
            marginLeft: pxToRem(10),
            marginRight:pxToRem(10),
            width:pxToVw(270),
            height: pxToRem(55),
            background: "#283A46 0% 0% no-repeat padding-box ",
            border: "0.01rem solid #356680",
            borderRadius: pxToRem(10),
            marginRight:pxToRem(30),
            opacity: "1",
            textTransformation: "none",
            textAlign: "center",
            color:'white',
           
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
      color:'#FFFFFF'
    },
  
}));

//Creating SearchBar
const Search = () => {
  const classes = useStyles();
  const [values, setValues] = useState("");
  const dispatch = useDispatch();
 const searchData = (values) => {
    axios
      .get(`http://localhost:8082/1806285/search.do`, { params: values })

      .then((response) => {

        dispatch(search({
          type:  'Search',
          payload: response.data
        }));
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      });
  };
  const responseData = useSelector((state) => {
    
    return state.search
  });
  const debounce = (func, delay) => {
    let inDebounce
    return function() {
    const context = this
    const args = arguments
    clearTimeout(inDebounce)
    inDebounce = setTimeout(() =>
    searchData.apply(context, args)
    , delay)
    }
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
   const getFunction =  debounce(searchData(values),3000);
  };

  return (

    <Grid container spacing={0} className={classes.searchbar}>
    <InputBase
        className={classes.input}
        placeholder="Search by Order Number"
        inputProps={{ "aria-label": "search" }}
        onChange={handleInputChange}
        name="doc_id"
     />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
     >
     <SearchIcon className={classes.iconButton} />
     </IconButton>
     </Grid>

  );
};

export default Search;
