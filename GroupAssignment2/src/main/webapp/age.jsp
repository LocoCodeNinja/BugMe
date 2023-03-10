<%--
  Created by IntelliJ IDEA.
  User: james
  Date: 3/9/2023
  Time: 10:36 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri='http://java.sun.com/jsp/jstl/core' prefix='c'%>
<html>
<head>
    <title>Age Info</title>
    <style>
        * {
            box-sizing: border-box;
        }

        .row {
            margin-left:-5px;
            margin-right:-5px;
        }

        .column {
            float: left;
            width: 50%;
            padding: 5px;
        }

        table {
            width: 100%;
            border: 1px solid;
        }

        td {
            text-align: center;
        }
    </style>
</head>
<body>
<h1 align="center">Age Info</h1>
<div class="row">
    <div class="column">
        <h2 align="center">2011</h2>
        <table>
            <tr>
                <th>Male</th>
                <th>Female</th>
            </tr>
            <c:forEach items="${data2011}" var="item">
                <tr>
                    <!-- item[5] is male and item[6] is female -->
                    <td>${item[5]}</td>
                    <td>${item[6]}</td>
                </tr>
            </c:forEach>
        </table>
    </div>
    <div class="column">
        <h2 align="center">2016</h2>
        <table>
            <tr>
                <th>Male</th>
                <th>Female</th>
            </tr>
            <c:forEach items="${data2016}" var="item">
                <tr>
                    <!-- item[5] is male and item[6] is female -->
                    <td>${item[5]}</td>
                    <td>${item[6]}</td>
                </tr>
            </c:forEach>
        </table>
    </div>
</div>
</body>
</html>
