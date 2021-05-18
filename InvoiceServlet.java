package com.higradius;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.higradius.InvoicePOJO;

/**
 * Servlet implementation class InvoiceServlet
 */
@WebServlet("/InvoiceServlet")
public class InvoiceServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public InvoiceServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());
		ArrayList<InvoicePOJO> invoiceList = new ArrayList<>();
		try {
			//Register JDBC driver
			Class.forName("com.mysql.cj.jdbc.Driver");

			//Open a connection
			Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/h2h_internship","root","root");
			Statement stmt = conn.createStatement();

			ResultSet rs = stmt.executeQuery("select * from invoice_details");

			//Creating an ArrayList object
			

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
				inObj.setNotes(rs.getString("notes"));
				invoiceList.add(inObj);
			}

		}catch(Exception e) {
			//Handle errors for Class.forName
			e.printStackTrace();
		}
		
//		String name = request.getParameter("name");
//		Response resp = new Response();
//		resp.setName(name);
		Gson gson = new Gson();
		 String data = gson.toJson(invoiceList);
		 PrintWriter out = response.getWriter();
		 response.setContentType("application/json");
		 response.setCharacterEncoding("UTF-8");
		 out.print(data);
		 out.flush();
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
