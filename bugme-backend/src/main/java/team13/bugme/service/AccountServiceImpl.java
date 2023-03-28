package team13.bugme.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import team13.bugme.entity.Account;
import team13.bugme.repository.AccountRepository;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public Account createUser(Account user) {
        return accountRepository.save(user);
    }

    @Override
    public List<Account> getAllUsers() {
        return accountRepository.findAll();
    }

    @Override
    public Account getUserById(int id) {
        Optional<Account> user = accountRepository.findById(id);
        return user.orElse(null);
    }

    @Override
    public Account updateUserById(int id, Account user) {
        user.setId(id);
        return accountRepository.save(user);
    }

    @Override
    public void deleteUserById(int id) {
        accountRepository.deleteById(id);
    }
}
