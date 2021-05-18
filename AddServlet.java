package com.higradius;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class AddServlet
 */
@WebServlet("/AddServlet")
public class AddServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	/* 
    public SaveServlet() {
        super();

    }*/

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html");
		PrintWriter out=response.getWriter();
		String name_customer=request.getParameter("name_customer");
		String cust_number=request.getParameter("cust_number");
		Long doc_id=Long.parseLong(request.getParameter("doc_id"));
		Double total_open_amount=Double.parseDouble(request.getParameter("total_open_amount"));

		String due=request.getParameter("due_in_date");
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");

		java.util.Date value=null;
		try {
			value = formatter.parse(due);
		} catch (ParseException e2) {
			// TODO Auto-generated catch block
			e2.printStackTrace();
		}
		java.sql.Date due_in_date = new java.sql.Date(value.getTime());

		String notes=request.getParameter("notes");

		InvoicePOJO e=new InvoicePOJO();
		e.setNameCustomer(name_customer);
		e.setCustNumber(cust_number);
		e.setDocId(doc_id);
		e.setTotalOpenAmount(total_open_amount);
		e.setDueInDate(due_in_date);
		e.setNotes(notes);

		int status = 0;
		try {
			status = Invoice.insertUser(e);
		} catch (SQLException e1) {
			e1.printStackTrace();
		}
		if(status>0){
			out.print("<p>Record added successfully!</p>");
			//request.getRequestDispatcher("index.html").include(request, response);
		}else{
			out.println("Sorry! unable to add record");
		}

		out.close();
		//doGet(request, response);
	}


}



