package team13.bugme.service;

import team13.bugme.model.Product;

import java.util.List;
public interface ProductService {
    List<Product> findAll();

    Product save(Product product);

    Product findById(Long id);

    void delete(Long id);
}
