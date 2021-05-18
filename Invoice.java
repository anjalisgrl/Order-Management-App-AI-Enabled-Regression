package com.higradius;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;


public class Invoice {

	private static String jdbcURL = "jdbc:mysql://localhost/h2h_internship";
	private static String dbUser = "root";
	private static String dbPassword = "root";

	//Different SQL Queries
	static String all_sql="select * from invoice_details";
	static String all_sql_inf="select * from invoice_details LIMIT ?,? ";
	static String Insert_sql = "INSERT INTO invoice_details "+"( name_customer,cust_number,doc_id,total_open_amount,due_in_date,notes ) VALUES "
			+"(?,?,?,?,?,?);";
	static String dlt_sql = "delete from invoice_details where doc_id=?;";
	static String update_sql = "update invoice_details set total_open_amount=?,notes=?  where doc_id=?;";
	static String search_sql="select name_customer,cust_number,doc_id,total_open_amount,due_in_date,notes  from invoice_details WHERE doc_id LIKE CONCAT( '%',?,'%') LIMIT 100;";
	static String VC_sql="select doc_id,invoice_id,posting_date,due_in_date,invoice_currency,total_open_amount  from invoice_details where doc_id=?";

	//Establishing Connection
	protected static Connection getConnection() {
		Connection conn=null;
		try {
			Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection(jdbcURL, dbUser, dbPassword);

		}catch(SQLException e) {
			e.printStackTrace();
		}catch(ClassNotFoundException e) {
			e.printStackTrace();
		}
		return conn;
	}

	//Add Customer

	public static int insertUser(InvoicePOJO user) throws SQLException{
		int status=0;
		try 
		(Connection conn=getConnection();
				PreparedStatement ps=conn.prepareStatement(Insert_sql);){
			
			ps.setString(1, user.getNameCustomer());
			ps.setString(2, user.getCustNumber());
			ps.setLong(3, user.getDocId());
			ps.setDouble(4, user.getTotalOpenAmount());
			ps.setDate(5, (java.sql.Date) user.getDueInDate());
			ps.setString(6,  user.getNotes());
			status=ps.executeUpdate();
			//conn.close();
		}catch(Exception e) {
			e.printStackTrace();
		}return status;
	}
	
	//Edit Customer

	public static int UpdateUser(InvoicePOJO user,long doc_id) throws SQLException{
		int status=0;
		try 	
		(Connection conn=getConnection();
				PreparedStatement stmt=conn.prepareStatement(update_sql);){

			stmt.setDouble(1, user.getTotalOpenAmount());

			stmt.setString(2, user.getNotes());
			stmt.setLong(3, doc_id);
			status=stmt.executeUpdate();
			conn.close();
			//stmt.close();
		}
		return status;
	}
	
	
	//Delete Customer
	public static int deleteUser(long doc_id) throws SQLException{
		int status=0;
		try (
				Connection conn=getConnection();
				PreparedStatement ps=conn.prepareStatement(dlt_sql);){	
			ps.setLong(1, doc_id);
			status=ps.executeUpdate();
			conn.close();
		}return status;
	}
	
	//Data loading
	public static ArrayList<InvoicePOJO> getJson() {
		ArrayList<InvoicePOJO> invoiceList = new ArrayList<>();
		try {
			Connection con= getConnection();  
			PreparedStatement ps=con.prepareStatement(all_sql);
			ResultSet rs=ps.executeQuery();

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
				inObj.setNotes(rs.getString("notes"));
				invoiceList.add(inObj);
			}
			con.close();  
			ps.close();
		}catch(Exception e){e.printStackTrace();}  

		return invoiceList;  

	}
	
	//Data load with infinite scroll
	public static ArrayList<InvoicePOJO> infiniteScroll(int count, int limit) {
		ArrayList<InvoicePOJO> invoiceList = new ArrayList<>();
		try {
			Connection con= getConnection();  
			PreparedStatement ps=con.prepareStatement(all_sql_inf);
			ps.setInt(1, (1+limit)*(count-1));
			ps.setInt(2, limit);
			ResultSet rs=ps.executeQuery();

			while(rs.next()){ 
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
				inObj.setNotes(rs.getString("notes"));

				invoiceList.add(inObj);
			}  
			con.close();  
			ps.close();
		}catch(Exception e){e.printStackTrace();}  

		return invoiceList;  

	}
	
	
	//Search customer
	public static List<InvoicePOJO> searchUser(Long doc_id){
		List<InvoicePOJO> users =new ArrayList<>();
		try (
				Connection conn=getConnection();
				PreparedStatement ps=conn.prepareStatement(search_sql)){
			ps.setLong(1, doc_id);
			ResultSet rs=ps.executeQuery();
			while(rs.next()) {
				InvoicePOJO inObj= new InvoicePOJO();
				inObj.setCustNumber(rs.getString("cust_number"));
				inObj.setNameCustomer(rs.getString("name_customer"));
				inObj.setDocId(rs.getLong("doc_id"));
				inObj.setDueInDate(rs.getDate("due_in_date"));
				inObj.setTotalOpenAmount(rs.getDouble("total_open_amount"));
				inObj.setNotes(rs.getString("notes"));
				users.add(inObj);
			}

		}catch(Exception e) {
			e.printStackTrace();}
		return users;
	}
	
	//View Correspondence
	public static List<InvoicePOJO> VCUser(Long doc_id){
		List<InvoicePOJO> users =new ArrayList<>();
		try (
				Connection conn=getConnection();
				PreparedStatement ps=conn.prepareStatement(VC_sql)){
			ps.setLong(1, doc_id);
			
			ResultSet rs=ps.executeQuery();
			while(rs.next()) {
				InvoicePOJO inObj= new InvoicePOJO();
				inObj.setDocId(rs.getLong("doc_id"));
				inObj.setInvoiceId(rs.getLong("invoice_id"));
				inObj.setPostingDate(rs.getDate("posting_date"));
				inObj.setDueInDate(rs.getDate("Due_in_date"));
				inObj.setInvoiceCurrency(rs.getString("invoice_currency"));
				inObj.setTotalOpenAmount(rs.getDouble("total_open_amount"));
				users.add(inObj);
			}

		}catch(Exception e) {
			e.printStackTrace();}
		return users;
	}
}




