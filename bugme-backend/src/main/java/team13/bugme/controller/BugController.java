package team13.bugme.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import team13.bugme.repository.BugRepository;

// BugController.java
@RestController
@RequestMapping("/bugs")
public class BugController {

    @Autowired
    private BugRepository bugRepository;



}



