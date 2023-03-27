package team13.bugme.service;

import team13.bugme.entity.Product;

import java.util.List;

public interface ProductService {
    Product createProduct(Product product);
    Product getProductById(int id);
    List<Product> getAllProducts();
    Product updateProductById(int id, Product product);
    void deleteProductById(int id);

}

