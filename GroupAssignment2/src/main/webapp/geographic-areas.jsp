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
  <title>Geographic areas</title>

  <style>
    td {
      text-align: center;
    }
  </style>
</head>
<body>
<div align="center">
  <h2>Geographic Areas</h2>
  <form method="post" action="<%=request.getContextPath()%>/Age">
    <input type="submit" value="View Age Data"/>
  </form>
</div>
<br/>
<table border="1" align="center" width="50%">
  <tr>
    <th>Level</th>
    <th>Name</th>
  </tr>
  <c:forEach items="${geographicArea}" var="item">
    <tr>
      <td>${item[2]}</td>
      <td><a href="IndividualGeographicArea?areaId=${item[0]}">${item[3]}</a></td>
    </tr>
  </c:forEach>
</table>
</body>
</html>
