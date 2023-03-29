package team13.bugme.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import team13.bugme.entity.AccountBug;
import team13.bugme.repository.AccountBugRepository;

import java.sql.SQLOutput;
import java.util.ArrayList;
import java.util.Arrays;
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

    public List<Boolean> getAllAccountBugById(int userId) {
        List<Boolean> result = new ArrayList<Boolean>();
        List<AccountBug> queryResults;

        try{
            queryResults = accountBugRepository.getAllByAccountIdOrderByBugId(userId);

            for (int i = 0; i < queryResults.size(); i++) {
                //System.out.println(queryResults.get(i).getBugId());
                result.add(queryResults.get(i).getBugEnabled());
            }
        }
        catch (Exception ex){
            System.out.println(ex);
        }
        return result;
    }

    @Override
    public AccountBug getAccountBugById(int id) {
        System.out.println(accountBugRepository.findById(id));
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
