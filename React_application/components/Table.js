import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress,withStyles, makeStyles,Table,TableBody,TableCell,TableContainer,TableHead,
  TableRow,Paper,TableSortLabel,Checkbox, Button} from "@material-ui/core";
import { pxToRem, pxToVw, pxToVh } from '../utils/theme';
import PropTypes from 'prop-types';
import Buttons from "./Buttons";
import { useDispatch,useSelector } from 'react-redux';
import { getOrders,checked } from './../actions/Curdaction';


const headCells = [
  { id: 'name_customer', label: 'Customer Name',numeric: false, disablePadding: true },
  { id: 'cust_number', label: 'Customer#',numeric: true, disablePadding: false },
  { id: 'doc_id', label: 'Order#',numeric: true, disablePadding: false },
  { id: 'total_open_amount', label: 'Order Amount',numeric: true, disablePadding: false },
  { id: 'due_date', label: 'Due Date',numeric: false, disablePadding: false },
  { id: 'predicted_payment_date', label: 'Predicted Payment Date',numeric: false, disablePadding: false },
  { id: 'aging_bucket', label: 'Predicted Aging Bucket',numeric: false, disablePadding: false },
  { id: 'notes', label: 'Notes',numeric: false, disablePadding: false },
];

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.number.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    console.log(orderBy);
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <StyledTableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all' }}
          />
        </StyledTableCell>
        
        {headCells.map((headCells) => (
          
          <StyledTableCell
            key={headCells.id }
            padding={headCells.disablePadding ? 'none' : 'default'}            
          >
            <TableSortLabel
              active={orderBy === headCells.id}
              direction={orderBy === headCells.id ? order : 'asc'}
              onClick={createSortHandler(headCells.id)}
            >
              {headCells.label}
              {orderBy === headCells.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
          
        ))}
      </TableRow>
    </TableHead>
  );
}


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#283A46",
    color: "#97A1A9",
    borderBottom:"none",
    fontSize: pxToRem(22),
    textAlign:'center',
  },
  body: {
      fontSize: pxToRem(18),
      color: "#FFFFFF",
      textAlign:'center',
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#273D49CC",
      heigth: pxToRem(8),
        },
      "&:nth-of-type(even)": {
        backgroundColor: "#283A46",
        height: pxToRem(8),
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    marginBottom: theme.spacing(2),
    backgroundColor: '#273D49CC',
    marginTop: pxToRem(35),
    width: '100%',
    marginLeft: "auto",
    marginRight: "auto",
    border: "none",
   
  },
    
  container: {
    maxHeight: pxToVh(410),
    
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: pxToVh(1),
    margin: pxToRem(-1),
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: pxToVh(20),
    width: 1,
  },
}));

//Sorting
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function ascendingComparator(a, b, orderBy) {
  if (b[orderBy] > a[orderBy]) {
    return -1;
  }
  if (b[orderBy] < a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => ascendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}


//Creating Table
function TableData() {
  const classes = useStyles();
  let [isNext, isNextFunc] = React.useState(false);
  let [pageCount, setCount] = React.useState(1);
  const fetchData = () => {
    axios.get(
        
        `http://localhost:8082/1806285/invoiceload.do?count=${pageCount}&limit=10`,
        )
      .then((response) => {
        
        dispatch(getOrders({
          type:  'Orders',
          payload: response.data
        }));
      })
      
      .catch((error) => {
        console.log(error);
      });
  };
  const responseData = useSelector((state) => {
    return state.orders;
  });

  function fetchMoreData() {
    setCount(pageCount + 1);
    fetchData();
  }

  useEffect( () =>{
    isNextFunc(true);
    fetchMoreData();
  },[]);

  const selected = useSelector((state)=>state.checked)
  console.log(selected)
  
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = responseData.map((n) => n.doc_id);
      dispatch(checked({
        type:'Checked',
        payload:newSelecteds}));
      return;
    }
    dispatch(checked([]));
   
  };

  const handleClick = (event, doc_id) => {
    const selectedIndex = selected.indexOf(doc_id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, doc_id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    dispatch(checked({
      type:'Checked',
      payload:newSelected}));
  };

  console.log(responseData.length)
    const isSelected = (doc_id) => selected.indexOf(doc_id) !== -1;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, responseData.length - page * rowsPerPage);
    const dispatch = useDispatch() 
    function convert(str) {
      var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-");
    }

  return (
    <Paper className={classes.table}>
     
     <Buttons selected={selected} responseData={responseData}/>
     
        <InfiniteScroll
        dataLength={responseData.length}
        next={fetchMoreData}
        hasMore={isNext}
        loader={
          <div
          style={{ height: "80%", paddingLeft: "40%", overflow: "hidden" }}
        > 
        Loading...  <CircularProgress /></div>
      } useWindow={false}
      scrollableTarget="scrollable"
      ><TableContainer className={classes.container} id="scrollable">

         <Table 
        stickyHeader
        aria-labelledby="tableTitle"
        aria-label="enhanced table">
          
        <EnhancedTableHead

              classes={classes}
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              
              onRequestSort={handleRequestSort}
              rowCount={responseData.length}
              
            />
      
         
        <TableBody>
              {
                    stableSort(responseData, getComparator(order, orderBy))
                    .map((row, index) => {
                  const isItemSelected = isSelected(row.doc_id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  
                  return (
                    
                    <StyledTableRow
                      hover
                      onClick={(event) => handleClick(event, row.doc_id)}
                      value={row.doc_id}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                    >
                      <StyledTableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </StyledTableCell>
                      <StyledTableCell component="th"  scope="row" padding="none">
                        {row.name_customer}
                      </StyledTableCell>
                      <StyledTableCell align="right">{row.cust_number}</StyledTableCell>
                      <StyledTableCell align="right">{row.doc_id}</StyledTableCell>
                      <StyledTableCell align="right">{row.total_open_amount}</StyledTableCell>
                      
                      <StyledTableCell align="right">{convert(row.due_in_date)}</StyledTableCell>
                      <StyledTableCell align="right">--</StyledTableCell>
                      <StyledTableCell align="right">--</StyledTableCell>
                      <StyledTableCell align="right">{row.notes}</StyledTableCell>
                    </StyledTableRow>
                  );
                })}

              
            </TableBody>
           
        </Table>
        </TableContainer>
      </InfiniteScroll>
     
    </Paper>
  );
}
export default TableData
