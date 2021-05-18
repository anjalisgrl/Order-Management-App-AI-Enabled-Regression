package com.higradius;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import com.higradius.InvoicePOJO;
import com.higradius.DatabaseConnection;

public class InvoiceArrayList {

	public static void main(String args[]) throws Exception {

		Connection connection = null;
		Statement stmt = null;

		try {

			//Getting the connection
			connection = DatabaseConnection.getConnection();

			//Creating a Statement object
			stmt = connection.createStatement();

			ResultSet rs = stmt.executeQuery("select * from invoice_details LIMIT 100");

			//Creating an ArrayList object
			ArrayList<InvoicePOJO> invoiceList = new ArrayList<>();

			//Adding the Records of the table to the Array List
			while(rs.next()) {
				InvoicePOJO inObj= new InvoicePOJO();

				inObj.setBusinessCode(rs.getString("business_code"));
				inObj.setCustNumber(rs.getString("cust_number"));
				inObj.setNameCustomer(rs.getString("name_customer"));
				inObj.setClearDate(rs.getTimestamp("clear_date"));
				inObj.setBusinessYear(rs.getShort("business_year"));
				inObj.setDocId(rs.getLong("doc_id"));
				inObj.setPostingDate(rs.getDate("posting_date"));
				inObj.setDocumentCreateDate(rs.getDate("document_create_date"));
				inObj.setDueInDate(rs.getDate("due_in_date"));
				inObj.setInvoiceCurrency(rs.getString("invoice_currency"));
				inObj.setDocumentType(rs.getString("document_type"));
				inObj.setPostingId(rs.getInt("posting_id"));
				inObj.setAreaBusiness(rs.getString("area_business"));
				inObj.setTotalOpenAmount(rs.getDouble("total_open_amount"));
				inObj.setBaselineCreateDate(rs.getDate("baseline_create_date"));
				inObj.setCustPaymentTerms(rs.getString("cust_payment_terms"));
				inObj.setInvoiceId(rs.getLong("invoice_id"));
				inObj.setIsOpen(rs.getInt("isOpen"));
				invoiceList.add(inObj);
			}
			
			//Displaying the data
			for (InvoicePOJO obj : invoiceList) {
				
				System.out.print("Bussiness_code: "+obj.getBusinessCode()+", ");
				System.out.print("Cust_number: "+obj.getCustNumber()+", ");
				System.out.print("Name_customer: "+obj.getNameCustomer()+", ");
				System.out.print("Clear_date: "+obj.getClearDate()+", ");
				System.out.print("Business_year: "+obj.getBusinessYear()+", ");
				System.out.print("Doc_id: "+obj.getDocId()+", ");
				System.out.print("Posting_date: "+obj.getPostingDate()+", ");
				System.out.print("Document_create_date: "+obj.getDocumentCreateDate()+", ");
				System.out.print("Due_in_date: "+obj.getDueInDate()+", ");
				System.out.print("Invoice_currency: "+obj.getInvoiceCurrency()+", ");
				System.out.print("Document_type: "+obj.getDocumentType()+", ");
				System.out.print("Posting_id: "+obj.getPostingId()+", ");
				System.out.print("Area_business: "+obj.getAreaBusiness()+", ");
				System.out.print("Total_open_amount: "+obj.getTotalOpenAmount()+", ");
				System.out.print("Baseline_create_date: "+obj.getBaselineCreateDate()+", ");
				System.out.print("Cust_payment_terms: "+obj.getCustPaymentTerms()+", ");
				System.out.print("Invoice_id: "+obj.getInvoiceId()+", ");
				System.out.print("IsOpen: "+obj.getIsOpen()+", ");




				System.out.println();
			}
			
			//Clean-up environment
			rs.close();
			stmt.close();
			connection.close();
		}catch(SQLException se){
			//Handle errors for JDBC
			se.printStackTrace();
		}catch(Exception e){
			//Handle errors for Class.forName
			e.printStackTrace();
		}finally{
			//finally block used to close resources
			try{
				if(stmt!=null)
					stmt.close();
			}catch(SQLException se2){
			}// nothing we can do
			try{
				if(connection!=null)
					connection.close();
			}catch(SQLException se){
				se.printStackTrace();
			}
		}
		System.out.println("Goodbye!");
	}

}
