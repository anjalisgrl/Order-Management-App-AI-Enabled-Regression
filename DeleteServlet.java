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
 * Servlet implementation class DeleteServlet
 */
@WebServlet("/DeleteServlet")
public class DeleteServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;


	public DeleteServlet() {
		super();

	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=response.getWriter();
		Long doc_id= Long.parseLong(request.getParameter("doc_id"));
		int status = 0;
		try {
			status=Invoice.deleteUser(doc_id);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		out.print(status);
		if(status>0){
			out.print("Update Successful!");	
		}
		else{
			out.println("Sorry! unable to update record");
		}


	}
}

