package com.higradius;
import java.io.*;

public class ReadCSV {
	public static void main(String arga[])
	{
		String path="C:\\Users\\KIIT\\Desktop\\1806285.csv";
		
		try {
			BufferedReader br=new BufferedReader(new FileReader(path));
			String readLine="";
			try 
			{
				while((readLine=br.readLine())!=null) 
				{
					String[] values=readLine.split(",");
					int i=0;
					while(values.length>i)
					{
					System.out.print(values[i]+"\t");
					i++;
					}
					System.out.println();
					
				}
			} 
			catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			} 
			catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
