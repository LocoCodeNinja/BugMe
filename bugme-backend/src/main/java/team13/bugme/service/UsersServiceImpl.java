package team13.bugme.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import team13.bugme.entity.UsersEntity;
import team13.bugme.repository.UsersRepository;

@Service
public class UsersServiceImpl implements UsersService{

    @Autowired
    private UsersRepository usersRepository;

    @Override
    public UsersEntity createUser(UsersEntity user) {
        return usersRepository.save(user);
    }

    @Override
    public List<UsersEntity> getAllUsers() {
        return usersRepository.findAll();
    }

    @Override
    public UsersEntity getUserById(int id) {
        Optional<UsersEntity> user = usersRepository.findById(id);
        return user.orElse(null);
    }

    @Override
    public UsersEntity updateUserById(int id, UsersEntity user) {
        user.setId(id);
        return usersRepository.save(user);
    }

    @Override
    public void deleteUserById(int id) {
        usersRepository.deleteById(id);
    }
}
