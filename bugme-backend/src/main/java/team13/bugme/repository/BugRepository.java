package team13.bugme.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import team13.bugme.entity.BugsEntity;

// BugRepository.java
@Repository
public interface BugRepository extends JpaRepository<BugsEntity, Long> {
}
