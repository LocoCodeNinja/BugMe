package team13.bugme.service;

import team13.bugme.entity.Account;

import java.util.List;

public interface AccountService {
    Account createUser(Account user);

    List<Account> getAllUsers();

    Account getUserById(int id);

    Account updateUserById(int id, Account user);

    void deleteUserById(int id);

}
