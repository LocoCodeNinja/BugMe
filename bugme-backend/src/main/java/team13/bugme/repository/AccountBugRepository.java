package team13.bugme.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import team13.bugme.entity.AccountBug;

@Repository
public interface AccountBugRepository extends JpaRepository<AccountBug, Integer> {
}
