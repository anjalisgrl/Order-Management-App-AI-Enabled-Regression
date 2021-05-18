package com.higradius;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.higradius.Invoice;


@WebServlet("/InvoiceInfiniteScroll")
public class InvoiceInfiniteScroll extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public InvoiceInfiniteScroll() {
		super();
		// TODO Auto-generated constructor stub
	}


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		int limit=Integer.parseInt(request.getParameter("limit"));
		int count=Integer.parseInt(request.getParameter("count"));
		ArrayList<InvoicePOJO> invoiceList = new ArrayList<>();
		invoiceList = Invoice.infiniteScroll(count,limit);
		Gson gson = new Gson();
		String data = gson.toJson(invoiceList);
		PrintWriter out = response.getWriter();
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		out.print(data);
		out.flush(); 
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
