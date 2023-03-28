package team13.bugme.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import team13.bugme.entity.Bug;
import team13.bugme.service.BugService;

import java.util.List;

@RestController
@RequestMapping("/api/bugs")
@CrossOrigin(origins = "http://localhost:4200")
public class BugController {
    @Autowired
    private BugService bugService;

    @GetMapping("/all")
    public List<Bug> getAllBugs() {
        return bugService.getAllBugs();
    }

    @GetMapping("/{id}")
    public Bug getBugById(@PathVariable int id) {
        return bugService.getBugById(id);
    }

    @PostMapping("/add")
    public void addBug(@RequestBody Bug bug) {
        bugService.addBug(bug);
    }

    @PutMapping("/update/{id}")
    public void updateBug(@RequestBody Bug bug, @PathVariable int id) {
        bugService.updateBug(id, bug);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteBug(@PathVariable int id) {
        bugService.deleteBug(id);
    }
}




