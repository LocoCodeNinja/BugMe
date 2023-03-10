package com.example.groupassignment2;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import util.CensusHandler;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.ResultSet;
import java.util.ArrayList;

@WebServlet(name = "IndividualGeographicAreaController", value = "/IndividualGeographicArea")
public class IndividualGeographicAreaController extends HttpServlet {
    private CensusHandler censusHandler;

    public IndividualGeographicAreaController() {
        super();
        censusHandler = new CensusHandler();
    }
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int areaId = -1;
        try {
            // gets the geographic area id from the url
            areaId = Integer.parseInt(request.getParameter("areaId"));
        } catch (Exception e) {
            e.printStackTrace();
        }

        ResultSet resultSet = censusHandler.getGeographicAreaById(areaId);
        int population = censusHandler.getPopulationOfArea(areaId);
        try {
            // Adds all of the data from the database into an arraylist
            ArrayList data = new ArrayList();
            while (resultSet.next()) {
                for (int i = 1; i < 4; i++) {
                    String j = resultSet.getString(i);
                    data.add(j);
                }
            }
            // Adds the population into the array list
            data.add(Integer.toString(population));

            response.setContentType("text/html");

            PrintWriter out = response.getWriter();
            out.println("<html><body>");
            out.println("<div align='center'>");
            out.println("<h2>Geographic Area</h2>");

            out.println("<table border='1' align='center' width='50%'>");   // Start table

            out.println("<tr>");                                            // Table headings
            out.println("<th>Name</th>");
            out.println("<th>Code</th>");
            out.println("<th>Level</th>");
            out.println("<th>Total Population from 2016</th>");
            out.println("</tr>");                                           // End of table headings

            out.println("<tr>");                                            // Table data

            out.println("<td>" + data.get(2) + "</td>");                    // Name
            out.println("<td>" + data.get(0) + "</td>");                    // Code
            out.println("<td>" + data.get(1) + "</td>");                    // Level
            out.println("<td>" + data.get(3) + "</td>");                    // Total Population

            out.println("</tr>");                                           // End of table data

            out.println("</table");                                         // End table

            out.println("</div'>");
            out.println("</body></html>");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
