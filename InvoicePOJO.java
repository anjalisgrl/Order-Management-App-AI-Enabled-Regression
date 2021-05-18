package com.higradius;

import java.util.*;
import java.sql.Timestamp;


//POJO class
public class InvoicePOJO {

	// Member variables of the class

	private String business_code;
	private String cust_number;
	private String name_customer;
	private Timestamp clear_date;
	private Short business_year;
	private Long doc_id;
	private Date posting_date;
	private Date document_create_date;
	private Date due_in_date;
	private String invoice_currency;
	private String document_type;
	private Integer posting_id;
	private String area_business;
	private Double total_open_amount;
	private Date baseline_create_date;
	private String cust_payment_terms;
	private Long invoice_id;
	private Integer isOpen;
	private String notes;
	
	public InvoicePOJO() {
		
	}

	//get and set methods

	public InvoicePOJO(String business_code, String cust_number, String name_customer, Timestamp clear_date,
			Short business_year, Long doc_id, Date posting_date, Date document_create_date, Date due_in_date,
			String invoice_currency, String document_type, Integer posting_id, String area_business,
			Double total_open_amount, Date baseline_create_date, String cust_payment_terms, Long invoice_id,
			Integer isOpen, String notes) {
		super();
		this.business_code = business_code;
		this.cust_number = cust_number;
		this.name_customer = name_customer;
		this.clear_date = clear_date;
		this.business_year = business_year;
		this.doc_id = doc_id;
		this.posting_date = posting_date;
		this.document_create_date = document_create_date;
		this.due_in_date = due_in_date;
		this.invoice_currency = invoice_currency;
		this.document_type = document_type;
		this.posting_id = posting_id;
		this.area_business = area_business;
		this.total_open_amount = total_open_amount;
		this.baseline_create_date = baseline_create_date;
		this.cust_payment_terms = cust_payment_terms;
		this.invoice_id = invoice_id;
		this.isOpen = isOpen;
		this.notes = notes;
	}
	
	public InvoicePOJO( String name_customer, String cust_number,Long doc_id, Date due_in_date, Double total_open_amount,
			 String notes) {
		super();
		this.name_customer = name_customer;
		this.cust_number = cust_number;
		this.doc_id = doc_id;
		this.due_in_date = due_in_date;
		this.total_open_amount = total_open_amount;
		this.notes = notes;
	}

	//business_code
	public String getBusinessCode() {
		return business_code;
	}
	public void setBusinessCode(String business_code) {
		this.business_code = business_code;
	}

	//cust_number
	public String getCustNumber() {
		return cust_number;
	}
	public void setCustNumber(String cust_number) {
		this.cust_number = cust_number;
	}

	//name_customer
	public String getNameCustomer() {
		return name_customer;
	}
	public void setNameCustomer(String name_customer) {
		this.name_customer = name_customer;
	}

	//clear_date
	public Timestamp getClearDate() {
		return clear_date;
	}
	public void setClearDate(Timestamp clear_date) {
		this.clear_date = clear_date;
	}

	//business_year
	public Short getBusinessYear() {
		return business_year;
	}
	public void setBusinessYear(Short business_year) {
		this.business_year = business_year;
	}

	//doc_id
	public Long getDocId() {
		return doc_id;
	}
	public void setDocId(Long doc_id) {
		this.doc_id = doc_id;
	}

	//posting_date
	public Date getPostingDate() {
		return posting_date;
	}
	public void setPostingDate(Date posting_date) {
		this.posting_date = posting_date;
	}

	//document_create_date
	public Date getDocumentCreateDate() {
		return document_create_date;
	}
	public void setDocumentCreateDate(Date document_create_date) {
		this.document_create_date = document_create_date;
	}

	//due_in_date
	public Date getDueInDate() {
		return due_in_date;
	}
	public void setDueInDate(Date due_in_date) {
		this.due_in_date = due_in_date;
	}

	//invoice_currency
	public String getInvoiceCurrency() {
		return invoice_currency;
	}
	public void setInvoiceCurrency(String invoice_currency) {
		this.invoice_currency = invoice_currency;
	}

	//document_type
	public String getDocumentType() {
		return document_type;
	}
	public void setDocumentType(String document_type) {
		this.document_type = document_type;
	}

	//posting_id
	public Integer getPostingId() {
		return posting_id;
	}
	public void setPostingId(Integer posting_id) {
		this.posting_id = posting_id;
	}

	//area_business
	public String getAreaBusiness() {
		return area_business;
	}
	public void setAreaBusiness(String area_business) {
		this.area_business = area_business;
	}

	//total_open_amount
	public Double getTotalOpenAmount() {
		return total_open_amount;
	}
	public void setTotalOpenAmount(Double total_open_amount) {
		this.total_open_amount = total_open_amount;
	}

	//baseline_create_date
	public Date getBaselineCreateDate() {
		return baseline_create_date;
	}
	public void setBaselineCreateDate(Date baseline_create_date) {
		this.baseline_create_date = baseline_create_date;
	}

	//cust_payment_terms
	public String getCustPaymentTerms() {
		return cust_payment_terms;
	}
	public void setCustPaymentTerms(String cust_payment_terms) {
		this.cust_payment_terms = cust_payment_terms;
	}

	//invoice_id
	public Long getInvoiceId() {
		return invoice_id;
	}
	public void setInvoiceId(long invoice_id) {
		this.invoice_id = invoice_id;
	}

	//isOpen
	public Integer getIsOpen() {
		return isOpen;
	}
	public void setIsOpen(Integer isOpen) {
		this.isOpen = isOpen;
	}

	//notes
	public String getNotes() {
		return notes;
	}
	public void setNotes(String notes) {
		this.notes = notes;
	}
}
