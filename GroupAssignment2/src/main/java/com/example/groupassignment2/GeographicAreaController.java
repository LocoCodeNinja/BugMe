package com.example.groupassignment2;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import util.CensusHandler;

import java.io.IOException;
import java.sql.ResultSet;
import java.util.ArrayList;

@WebServlet(name = "GeographicAreaController", value = "/GeographicArea")
public class GeographicAreaController extends HttpServlet {
    private CensusHandler censusHandler;

    public GeographicAreaController() {
        super();
        censusHandler = new CensusHandler();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) {
        System.out.println(request.getParameter("test"));
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) {
        ResultSet resultSet = censusHandler.getGeographicArea();
        try {
            ArrayList rows = new ArrayList();
            while (resultSet.next()) {
                ArrayList row = new ArrayList();
                for (int i = 1; i < 6; i++) {
                    String j = resultSet.getString(i);
                    row.add(j);
                }
                rows.add(row);
            }

            request.setAttribute("geographicArea", rows);
            RequestDispatcher requestDispatcher = getServletContext().getRequestDispatcher("/geographic-areas.jsp");
            requestDispatcher.forward(request, response);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
