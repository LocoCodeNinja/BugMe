package team13.bugme.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import team13.bugme.entity.AccountBug;
import team13.bugme.service.AccountBugService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/account-bugs")
public class AccountBugController {

    @Autowired
    private AccountBugService accountBugService;

    @GetMapping("/all")
    public List<AccountBug> getAllAccountBugs() {
        return accountBugService.getAllAccountBugs();
    }

    @GetMapping("/{id}")
    public AccountBug getAccountBugById(@PathVariable int id) {
        return accountBugService.getAccountBugById(id);
    }

    @PostMapping("/add")
    public AccountBug addAccountBug(@RequestBody AccountBug accountBug) {
        return accountBugService.addAccountBug(accountBug);
    }

    @PostMapping("/getAllById")
    public List<Boolean> getAllAccountBugById(@RequestBody int userId) {
        return accountBugService.getAllAccountBugById(userId);
    }

    @PutMapping("/{id}")
    public AccountBug updateAccountBug(@PathVariable int id, @RequestBody AccountBug accountBug) {
        return accountBugService.updateAccountBug(id, accountBug);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAccountBug(@PathVariable int id) {
        return accountBugService.deleteAccountBug(id);
    }
}

