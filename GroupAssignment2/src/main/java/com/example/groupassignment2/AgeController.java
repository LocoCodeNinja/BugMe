package com.example.groupassignment2;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import util.CensusHandler;

import java.io.IOException;
import java.sql.ResultSet;
import java.util.ArrayList;

@WebServlet(name = "AgeController", value = "/Age")
public class AgeController extends HttpServlet {
    private CensusHandler censusHandler;

    public AgeController() {
        super();
        censusHandler = new CensusHandler();
    }
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        ResultSet ageData2011 = censusHandler.getAgeData2011();
        ResultSet ageData2016 = censusHandler.getAgeData2016();

        try {
            // Adds all of the 2011 data from the database into an arraylist
            ArrayList<ArrayList> data2011 = new ArrayList();
            while (ageData2011.next()) {
                ArrayList row = new ArrayList();
                for (int i = 1; i < 8; i++) {
                    String j = ageData2011.getString(i);
                    row.add(j);
                }
                data2011.add(row);
            }

            // Adds all of the 2016 data from the database into an arraylist
            ArrayList<ArrayList> data2016 = new ArrayList();
            while (ageData2016.next()) {
                ArrayList row = new ArrayList();
                for (int i = 1; i < 8; i++) {
                    String j = ageData2016.getString(i);
                    row.add(j);
                }
                data2016.add(row);
            }

            request.setAttribute("data2011", data2011);
            request.setAttribute("data2016", data2016);
            RequestDispatcher requestDispatcher = getServletContext().getRequestDispatcher("/age.jsp");
            requestDispatcher.forward(request, response);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
