package com.higradius;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class EditServlet2
 */
@WebServlet("/EditServlet")
public class EditServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;



	public EditServlet() {
		super();

	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html");
		PrintWriter out=response.getWriter();
		Long doc_id= Long.parseLong(request.getParameter("doc_id"));
		Double total_open_amount=Double.parseDouble(request.getParameter("total_open_amount"));
		String notes=request.getParameter("notes");
		System.out.println(doc_id);
		System.out.println(total_open_amount);
		System.out.println(notes);
		InvoicePOJO e=new InvoicePOJO();

		e.setTotalOpenAmount(total_open_amount);
		e.setNotes(notes);
		int status = 0;
		try {
			status = Invoice.UpdateUser(e,doc_id);
		} catch (SQLException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		if(status>0){
			out.print("Update Successful!");

		}
		else{
			out.println("Sorry! unable to update record");
		}


		out.close();

	}
}


