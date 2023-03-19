package team13.bugme.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import team13.bugme.entity.ProductsEntity;
@Repository
public interface ProductsRepository extends JpaRepository<ProductsEntity, Integer> {
}
