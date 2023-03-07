package team13.bugme.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import team13.bugme.model.User;
import team13.bugme.service.UserService;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1")

public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/users")
    public ResponseEntity<List<User>> get(){
        List<User> users = userService.findAll();

        return new ResponseEntity<List<User>>(users, HttpStatus.OK);
    }
    @PostMapping("/users")
    public ResponseEntity<User> save(@RequestBody User user) {
        User userOne = userService.save(user);
        return new ResponseEntity<User>(userOne, HttpStatus.CREATED);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> get(@PathVariable("id") Long id) {
        User user = userService.findById(id);
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") Long id) {
        userService.delete(id);
        return new ResponseEntity<String>("User deleted successfully.!", HttpStatus.OK);
    }
}
