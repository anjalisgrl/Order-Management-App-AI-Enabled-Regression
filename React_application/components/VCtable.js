import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { pxToRem, pxToVw, pxToVh } from '../utils/theme';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: "#283A46",
      color: "#97A1A9",
      borderBottom:"none",
      fontSize: 12,
    },
    body: {
        fontSize: 12,
        color: "#FFFFFF",
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: "#273D49CC",
        heigth: pxToRem(6),
          },
        "&:nth-of-type(even)": {
          backgroundColor: "#283A46",
          height: pxToRem(6),
      },
    },
  }))(TableRow);

export default function TableData(props) {

    return(

        
    <TableContainer >
        <Table 
        stickyHeader
        aria-labelledby="tableTitle"
        aria-label="enhanced table">
            <TableHead>
                <StyledTableCell>Order Number</StyledTableCell>
                <StyledTableCell>PO Number</StyledTableCell>
                <StyledTableCell>Order Date</StyledTableCell>
                <StyledTableCell>Due Date</StyledTableCell>
                <StyledTableCell>Order Currency</StyledTableCell>
                <StyledTableCell>Open Amount($)</StyledTableCell>

            </TableHead>
            <TableBody>
              {
                (props.responseData).map((row, index) => {
                    
                  
                  return (
                    
                    <StyledTableRow>
                      
                      <StyledTableCell >{row.doc_id}</StyledTableCell>
                      <StyledTableCell >{row.doc_id}</StyledTableCell>
                      <StyledTableCell >{row.posting_date}</StyledTableCell> 
                      <StyledTableCell >{row.due_in_date}</StyledTableCell>
                      <StyledTableCell >{row.invoice_currency}</StyledTableCell>
                      <StyledTableCell >{row.total_open_amount}</StyledTableCell>
                      
                    </StyledTableRow>
                  );
                })}

              
            </TableBody>
        </Table>
    </TableContainer>
)
}
