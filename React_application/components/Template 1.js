import React from 'react';
import { withStyles,makeStyles, withTheme } from '@material-ui/core/styles';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import VCtable from './VCtable'

export default  function template1(props){
  
  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);
        return(
            <DialogContent dividers >
            <Typography gutterBottom >
             Subject:Invoice Details-Account Name
            </Typography>
            <Typography gutterBottom>
            Dear Sir/Madam<br></br>
            Greeting!
            </Typography>
            <Typography gutterBottom>
              This is to remind you that there are one or more open invoices on your account. please provide
              at your earliest convenience an update on the payment details or clarify the reason for the delay.
              If you have any specific issue with the invoice(s),please let us know so that we can address it to the
              correct Department.
            </Typography>
            <Typography gutterBottom>
              Please find the details of the invoices bellow:
            </Typography>
            < VCtable responseData={props.responseData} />
            <Typography gutterBottom>
              Total Amount to be Paid:<br></br>
              In case you have already made a payment for the above items, please send us the details to ensure the payment is posted. <br></br>
              Let us know if we can be of any further assistance. Looking forward to hearing from you.<br></br>
              Kind Regards,<br></br>
              [Sender’s First Name][Sender’s Last Name]<br></br>
              Phone : [Sender’s contact number]
              Fax : [If any]
              Email : [Sender’s Email Address]
              Company Name[Sender’s Company Name]
            </Typography>
          </DialogContent> 
        );
}