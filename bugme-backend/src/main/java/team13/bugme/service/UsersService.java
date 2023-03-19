package team13.bugme.service;

import team13.bugme.entity.UsersEntity;

import java.util.List;

public interface UsersService {
    UsersEntity createUser(UsersEntity user);

    List<UsersEntity> getAllUsers();

    UsersEntity getUserById(int id);

    UsersEntity updateUserById(int id, UsersEntity user);

    void deleteUserById(int id);

}
