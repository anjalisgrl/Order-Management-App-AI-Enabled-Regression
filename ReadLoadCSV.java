package com.higradius;

import java.io.*;
import java.sql.Statement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.*;

import com.higradius.InvoicePOJO;
import com.higradius.DatabaseConnection;

public class ReadLoadCSV {


	public static void main(String[] args) {

		final long startTime = System.nanoTime();

		//passing file location and getting results in a list of the invoices
		ArrayList<InvoicePOJO> invoiceList = getDetails("C:\\Users\\KIIT\\Desktop\\1806285.csv");

		//Initializing the batch size 
		int batchSize = 2000;
		
		//Creating the Statement object 
		Statement stmt = null;
		
		//Creating the PreparedStatement object 
		PreparedStatement prepstmt = null;
		
		//Creating the Connection object 
		Connection connection = null;

		try {
			//Open a connection
			connection = DatabaseConnection.getConnection();
			stmt = connection.createStatement();
			System.out.println("Connection established......");

			//Setting the auto commit off
			connection.setAutoCommit(false);
			int count = 0;
			
			//Query to Truncate the table before it loads data inorder to avoid duplicate rows
			String query = "TRUNCATE TABLE invoice_details";
			//Executing Statement
			stmt.execute(query);
			
			//Query to insert the values in the table
			String sql = "INSERT INTO invoice_details (business_code, cust_number, name_customer, clear_date, business_year, doc_id, posting_date, document_create_date, due_in_date, invoice_currency, document_type, posting_id, area_business, total_open_amount, baseline_create_date, cust_payment_terms, invoice_id, isOpen) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
			prepstmt = connection.prepareStatement(sql);

			//iterating invoices list one by one
			for(InvoicePOJO  invoice: invoiceList){
				// get is used to get the value from the POJO class
				//set is used to set the values in the particular index
				prepstmt.setString(1,invoice.getBusinessCode());
				prepstmt.setString(2,invoice.getCustNumber());
				prepstmt.setString(3,invoice.getNameCustomer());
				prepstmt.setTimestamp(4,(java.sql.Timestamp) invoice.getClearDate());
				prepstmt.setShort(5, invoice.getBusinessYear());
				prepstmt.setLong(6, invoice.getDocId());
				prepstmt.setDate(7, (java.sql.Date) invoice.getPostingDate());
				prepstmt.setDate(8, (java.sql.Date) invoice.getDocumentCreateDate());
				prepstmt.setDate(9,(java.sql.Date) invoice.getDueInDate());
				prepstmt.setString(10, invoice.getInvoiceCurrency());
				prepstmt.setString(11, invoice.getDocumentType());
				prepstmt.setInt(12, invoice.getPostingId());
				prepstmt.setString(13, invoice.getAreaBusiness());
				prepstmt.setDouble(14, invoice.getTotalOpenAmount());
				prepstmt.setDate(15, (java.sql.Date) invoice.getBaselineCreateDate());
				prepstmt.setString(16, invoice.getCustPaymentTerms());
				prepstmt.setLong(17, invoice.getInvoiceId());
				prepstmt.setInt(18, invoice.getIsOpen());
				
				//adding batches in loop
				prepstmt.addBatch();
				count++;
				if (count % batchSize == 0) {
					//to start the execution of all the statements
					prepstmt.executeBatch();
				}

			}
			prepstmt.executeBatch();
			System.out.println("Data loaded successfully!!!");
			//Clean-up environment
			prepstmt.close();
			connection.commit();
			connection.close();
		}
		catch (SQLException ex) {
			ex.printStackTrace();
		}
		catch(Exception e){
			//Handle errors for Class.forName
			e.printStackTrace();
		}
		finally{
			//finally block used to close resources
			try{
				if(prepstmt!=null)
					prepstmt.close();
			}catch(SQLException se2){
			}// nothing we can do
			try{
				if(connection!=null)
					connection.close();
			}catch(SQLException se){
				se.printStackTrace();
			}
		}
		
		final long endTime = System.nanoTime();
		// get difference of two nanoTime values
		System.out.println("Total execution time: " + (endTime - startTime)/ 1000000000 + " seconds");

	}



	//Takes file location as input and returns the list of invoices present in the file

	private static ArrayList<InvoicePOJO> getDetails(String file) {
		ArrayList<InvoicePOJO> invoiceList=new ArrayList<>();
		try {

			//Using BufferedReader to read the file
			BufferedReader lineReader = new BufferedReader(new FileReader(file));
			String lineText = " ";
			lineReader.readLine();
			while((lineText = lineReader.readLine()) !=null){

				//split the column in String array
				String [] data = lineText.split(",");

				//making the object of InvoicePOJO and getting the details from getOneInvoice() function
				InvoicePOJO invoice = getOneInvoice(data);
				
				//Adding object in the list
				invoiceList.add(invoice);

			}lineReader.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		//Returning the invoice list
		return invoiceList;

	}

	// Take invoice details and performing necessary conversions
	private static InvoicePOJO getOneInvoice(String[] data) {
		
		//Creating an object of InvoicePOJO
		InvoicePOJO invoice = new InvoicePOJO();

		//Setting the string data to business_code
		invoice.setBusinessCode(data[0]);
		
		//Setting the string data to cust_number
		invoice.setCustNumber(data[1]);
		
		//Setting the string data to name_customer
		invoice.setNameCustomer(data[2]);

		//Setting the data to clear_date changing string to Timestamp
		//if-else condition to check whether the data is null or not
		if(data[3].length()>0) {
			DateTimeFormatter dateTimeFormatterParser1 = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
			LocalDateTime clear = LocalDateTime.parse(data[3], dateTimeFormatterParser1);
			invoice.setClearDate(java.sql.Timestamp.valueOf(clear));
		}
		else {
			invoice.setClearDate(null);
		}
		
		//Setting the data to business_year changing string to short datatype
		String businessYear= (data[4]).substring(0, data[4].length() - 2);
		invoice.setBusinessYear(Short.valueOf(businessYear));
		
		//Setting the data to doc_id and changing string to long datatype
		String docId= (data[5]).substring(0, data[5].length() - 2);
		invoice.setDocId(Long.parseLong(docId));
		
		//Setting the data to posting_date and changing string to Date
		invoice.setPostingDate(java.sql.Date.valueOf(data[6]));
		
		//Setting the data to document_create_date and changing string to Date using DateTimeFormatter
		DateTimeFormatter dateTimeFormatterParser = DateTimeFormatter.ofPattern("yyyyMMdd");
		LocalDate localDocumentCreateDate = LocalDate.parse(data[8], dateTimeFormatterParser);
		invoice.setDocumentCreateDate(java.sql.Date.valueOf(localDocumentCreateDate));

		//Setting the data to due_in_date and changing string to Date using DateTimeFormatter
		String due= (data[9]).substring(0, data[9].length() - 2);
		LocalDate localDueInDate = LocalDate.parse(due, dateTimeFormatterParser);
		invoice.setDueInDate(java.sql.Date.valueOf(localDueInDate));
		
		//Setting data to invoice_currency
		invoice.setInvoiceCurrency(data[10]);
		
		//Setting data to document_type
		invoice.setDocumentType(data[11]);

		//Setting the data to postin_id and changing string to Integer datatype
		String newPostingId1= (data[12]).substring(0, data[12].length() - 2);
		invoice.setPostingId(Integer.parseInt(newPostingId1));

		//Setting the data to area_business and checking for the empty string
		invoice.setAreaBusiness(data.length == 0 ? "":data[13]);
		
		//Setting the data to total_open_amount and changing string to Double datatype
		invoice.setTotalOpenAmount(Double.parseDouble(data[14]));

		//Setting the data to baseline_create_date and changing string to Date using DateTimeFormatter
		String baseline= (data[15]).substring(0, data[15].length() - 2);
		LocalDate localBaselineCreateDate = LocalDate.parse(baseline, dateTimeFormatterParser);
		invoice.setBaselineCreateDate(java.sql.Date.valueOf(localBaselineCreateDate));

		//Setting the data to cust_payment_terms
		invoice.setCustPaymentTerms(data[16]);

		//Setting the data to invoice_id changing string to Long datatype
		//if-else condition to check whether the data is null or not
		if(data[17].length()>0) {
			String invoiceId= (data[17]).substring(0, data[17].length() - 2);
			invoice.setInvoiceId(Long.parseLong(invoiceId));
		}
		else {
			invoice.setInvoiceId(0);
		}
		
		//Setting the data to isOpen and changing string to Integer datatype
		invoice.setIsOpen(Integer.parseInt(data[18]));

		//returns one invoice object with having one column data in it
		return invoice;
	}



}
