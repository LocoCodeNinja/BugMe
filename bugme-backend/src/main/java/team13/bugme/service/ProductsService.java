package team13.bugme.service;

import team13.bugme.entity.ProductsEntity;

import java.util.List;

public interface ProductsService {
    ProductsEntity createProduct(ProductsEntity product);
    ProductsEntity getProductById(int id);
    List<ProductsEntity> getAllProducts();
    ProductsEntity updateProductById(int id, ProductsEntity product);
    void deleteProductById(int id);

}

