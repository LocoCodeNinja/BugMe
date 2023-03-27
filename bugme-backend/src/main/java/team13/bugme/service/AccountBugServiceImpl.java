package team13.bugme.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import team13.bugme.entity.AccountBug;
import team13.bugme.repository.AccountBugRepository;
import team13.bugme.service.AccountBugService;

import java.util.List;
import java.util.Optional;

@Service
public class AccountBugServiceImpl implements AccountBugService {

    @Autowired
    private AccountBugRepository accountBugRepository;

    @Override
    public List<AccountBug> getAllAccountBugs() {
        return accountBugRepository.findAll();
    }

    @Override
    public AccountBug getAccountBugById(int id) {
        return accountBugRepository.findById(id).orElse(null);
    }

    @Override
    public AccountBug addAccountBug(AccountBug accountBug) {
        return accountBugRepository.save(accountBug);
    }

    @Override
    public AccountBug updateAccountBug(int id, AccountBug accountBug) {
        Optional<AccountBug> accountBugOptional = accountBugRepository.findById(id);
        if (accountBugOptional.isPresent()) {
            AccountBug existingAccountBug = accountBugOptional.get();
            existingAccountBug.setBugId(accountBug.getBugId());
            existingAccountBug.setAccountId(accountBug.getAccountId());
            existingAccountBug.setBugEnabled(accountBug.getBugEnabled());
            return accountBugRepository.save(existingAccountBug);
        } else {
            throw new RuntimeException("AccountBug not found with id: " + id);
        }
    }

    @Override
    public AccountBug saveAccountBug(AccountBug accountBug) {
        return accountBugRepository.save(accountBug);
    }

    @Override
    public ResponseEntity<?> deleteAccountBug(int id) {
        accountBugRepository.deleteById(id);
        return null;
    }

}
