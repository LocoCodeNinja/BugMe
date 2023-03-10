<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>Canada Census Login</title>
</head>
<body>
<br/>

<div align="center">
    <h2>Login to the database</h2>
    <form action="<%=request.getContextPath()%>/Login" method="post">
        <table>
            <tr>
                <td>User Name</td>
                <td><input type="text" name="userName"></td>
            </tr>
            <h1>TESTTEST</h1>
            <tr>
                <td>Password</td>
                <td><input type="password" name="password"></td>
            </tr>
        </table>
        <input type="submit" value="Submit">
    </form>
    <p>${message}</p>
</div>

</body>
</html>