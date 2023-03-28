package team13.bugme.service;

import team13.bugme.entity.Bug;

import java.util.List;

public interface BugService {
    List<Bug> getAllBugs();

    Bug getBugById(int id);

    void addBug(Bug bug);

    void updateBug(int id, Bug bug);

    void deleteBug(int id);
}

