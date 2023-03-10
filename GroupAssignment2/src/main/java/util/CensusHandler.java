package util;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

public class CensusHandler {

    public CensusHandler() {
    }

    public ResultSet getGeographicArea() {
        try {
            Statement statement = DBUtil.getDbConnection().createStatement();
            return statement.executeQuery("SELECT * FROM GEOGRAPHICAREA ORDER BY level ASC;");
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public ResultSet getGeographicAreaById(int id) {
        try {
            PreparedStatement preparedStatement = DBUtil.getDbConnection().prepareStatement(
                    "SELECT code, level, name FROM GEOGRAPHICAREA WHERE geographicAreaID = ?;"
            );
            preparedStatement.setString(1, Integer.toString(id));
            return preparedStatement.executeQuery();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public int getPopulationOfArea(int geographicAreaId) {
        try {
            // Gets total population from the 2016 census year
            PreparedStatement preparedStatement = DBUtil.getDbConnection().prepareStatement(
                    "SELECT combined FROM AGE WHERE geographicArea = ? AND censusYear = 1;"
            );
            preparedStatement.setString(1, Integer.toString(geographicAreaId));
            ResultSet resultSet = preparedStatement.executeQuery();

            int population = 0;
            while (resultSet.next()) {
                population += resultSet.getInt("combined");
            }
            return population;
        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
    }

    public ResultSet getAgeData2011() {
        try {
            Statement statement = DBUtil.getDbConnection().createStatement();
            return statement.executeQuery("SELECT * FROM AGE WHERE censusYear = 2");
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public ResultSet getAgeData2016() {
        try {
            Statement statement = DBUtil.getDbConnection().createStatement();
            return statement.executeQuery("SELECT * FROM AGE WHERE censusYear = 1");
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
