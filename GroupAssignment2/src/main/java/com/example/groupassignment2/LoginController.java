package com.example.groupassignment2;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import util.DBUtil;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

@WebServlet(name = "LoginController", value = "/Login")
public class LoginController extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
/*        System.out.println("Called");
        String message;

        // Attempts to login the user
        // If successful they will be redirected to the main page of the website
        // If unsuccessful they will be notified that the login was invalid
        try {
            DBUtil.setDbConnection(request.getParameter("userName"), request.getParameter("password"));
            try (Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/ga1db", request.getParameter("userName"), request.getParameter("password"))){

            } catch (SQLException ex) {
                ex.printStackTrace();
            }
            RequestDispatcher view = request.getRequestDispatcher("/GeographicArea");
            view.forward(request, response);
            System.out.println("Called");
        } catch (SQLException e) {
            message = "Invalid Login";
            request.setAttribute("message", message);
            RequestDispatcher view = request.getRequestDispatcher("index.jsp");
            view.forward(request, response);
        }*/

        String message;

        // Attempts to login the user
        // If successful they will be redirected to the main page of the website
        // If unsuccessful they will be notified that the login was invalid
        try {
            DBUtil.setDbConnection(request.getParameter("userName"), request.getParameter("password"));
            RequestDispatcher view = request.getRequestDispatcher("/GeographicArea");
            view.forward(request, response);
            System.out.println("Called");
        } catch (ClassNotFoundException e) {
            message = "Invalid Login";
            request.setAttribute("message", message);
            RequestDispatcher view = request.getRequestDispatcher("index.jsp");
            view.forward(request, response);
            throw new RuntimeException(e);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

    }
}
