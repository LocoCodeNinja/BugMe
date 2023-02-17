package team13.bugme.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import team13.bugme.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}