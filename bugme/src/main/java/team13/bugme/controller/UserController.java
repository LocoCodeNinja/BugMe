package team13.bugme.controller;

import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.swagger2.annotations.EnableSwagger2;
import team13.bugme.model.User;
import team13.bugme.service.UserService;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1")
@EnableSwagger2
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
        return new ResponseEntity<User>(userOne, HttpStatus.OK);
    }

    @GetMapping("/expenses/{id}")
    public ResponseEntity<User> get(@PathVariable("id") Long id) {
        User user = userService.findById(id);
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    @DeleteMapping("/expenses/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") Long id) {
        userService.delete(id);
        return new ResponseEntity<String>("Expense is deleted successfully.!", HttpStatus.OK);
    }
}
