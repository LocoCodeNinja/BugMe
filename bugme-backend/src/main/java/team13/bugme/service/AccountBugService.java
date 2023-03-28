package team13.bugme.service;

import org.springframework.http.ResponseEntity;
import team13.bugme.entity.AccountBug;

import java.util.List;
import java.util.Optional;

public interface AccountBugService {

    List<AccountBug> getAllAccountBugs();

    AccountBug getAccountBugById(int id);

    AccountBug addAccountBug(AccountBug accountBug);

    AccountBug updateAccountBug(int id, AccountBug accountBug);

    AccountBug saveAccountBug(AccountBug accountBug);

    ResponseEntity<?> deleteAccountBug(int id);

}

