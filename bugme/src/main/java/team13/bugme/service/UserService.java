package team13.bugme.service;

import team13.bugme.model.User;

import java.util.List;

public interface UserService {

    List<User> findAll();

    User save(User user);

    User findById(Long id);

    void delete(Long id);
}
