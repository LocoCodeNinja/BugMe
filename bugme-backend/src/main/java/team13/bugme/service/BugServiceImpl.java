package team13.bugme.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team13.bugme.entity.Bug;
import team13.bugme.repository.BugRepository;
import team13.bugme.service.BugService;

import java.util.List;

@Service
public class BugServiceImpl implements BugService {
    @Autowired
    private BugRepository bugRepository;

    @Override
    public List<Bug> getAllBugs() {
        return bugRepository.findAll();
    }

    @Override
    public Bug getBugById(int id) {
        return bugRepository.findById(id).orElse(null);
    }

    @Override
    public void addBug(Bug bug) {
        bugRepository.save(bug);
    }

    @Override
    public void updateBug(int id, Bug bug) {
        Bug existingBug = bugRepository.findById(id).orElse(null);
        if (existingBug != null) {
            existingBug.setSeverity(bug.getSeverity());
            bugRepository.save(existingBug);
        }
    }

    @Override
    public void deleteBug(int id) {
        bugRepository.deleteById(id);
    }
}

