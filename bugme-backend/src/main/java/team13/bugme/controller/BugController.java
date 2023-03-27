package team13.bugme.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import team13.bugme.entity.Bug;
import team13.bugme.repository.BugRepository;

import java.util.List;

// BugController.java
@RestController
@RequestMapping("/bugs")
public class BugController {

    @Autowired
    private BugRepository bugRepository;


    @GetMapping("/all")
    public List<Bug> getAllBugs() {
        return bugRepository.findAll();
    }

}



