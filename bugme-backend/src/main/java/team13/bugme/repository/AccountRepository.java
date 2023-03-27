package team13.bugme.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import team13.bugme.entity.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {

}
