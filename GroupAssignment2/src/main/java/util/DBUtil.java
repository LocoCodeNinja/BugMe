package util;

import com.mysql.cj.jdbc.MysqlDataSource;

import java.sql.Connection;
import java.sql.Driver;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBUtil {
/*    private final static String URL = "jdbc:mysql://localhost:3306/ga1db";

    // dbConnection that will persist throughout the server's life span
    private static Connection dbConnection;

    public static Connection getDbConnection() {
        return dbConnection;
    }

    // Set the dbConnection with db credentials
    public static void setDbConnection(String user, String password) throws SQLException {
        System.out.println("DBCONNECTION called");
        MysqlDataSource mysqlDataSource = new MysqlDataSource();
        mysqlDataSource.setURL(URL);
        mysqlDataSource.setUser(user);
        mysqlDataSource.setPassword(password);

        dbConnection = mysqlDataSource.getConnection();
    }*/


    private final static String URL = "jdbc:mysql://localhost:3306/ga1db";

    // dbConnection that will persist throughout the server's life span
    public static Connection dbConnection;

    public static Connection getDbConnection() {
        return dbConnection;
    }

    // Set the dbConnection with db credentials
    public static void setDbConnection(String user, String password) throws ClassNotFoundException, SQLException {

/*        Class.forName("com.mysql.jdbc.Driver");
        try {
            dbConnection = DriverManager.getConnection("jdbc:mysql://localhost:3306/ga1db", user, password);
        }catch (SQLException ex){
            ex.printStackTrace();
        }*/
        MysqlDataSource mysqlDataSource = new MysqlDataSource();
        mysqlDataSource.setURL(URL);
        mysqlDataSource.setUser(user);
        mysqlDataSource.setPassword(password);


        dbConnection = mysqlDataSource.getConnection();
    }
}
