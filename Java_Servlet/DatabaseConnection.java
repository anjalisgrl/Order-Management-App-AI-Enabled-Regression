package com.higradius;

import java.sql.*;

public class DatabaseConnection {
	// JDBC driver name and database URL
	static final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
	static final String DB_URL = "jdbc:mysql://localhost/h2h_internship";

	// Database credentials
	static final String USER = "root";
	static final String PASS = "root";

	private static java.sql.Connection connection;

	public static Connection getConnection() throws Exception{
		try {
			//Register JDBC driver
			Class.forName(JDBC_DRIVER);

			//Open a connection
			connection = DriverManager.getConnection(DB_URL,USER,PASS);

			return connection;

		}catch(Exception e) {
			//Handle errors for Class.forName
			e.printStackTrace();
		}
		return null;
	}
}
