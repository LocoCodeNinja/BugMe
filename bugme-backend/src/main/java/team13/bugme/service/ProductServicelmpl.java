package team13.bugme.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team13.bugme.model.Product;
import team13.bugme.repository.ProductRepository;

import java.util.List;
@Service
public class ProductServicelmpl implements ProductService {
    @Autowired
    ProductRepository productRepository;

    @Override
    public List<Product> findAll() {
        return productRepository.findAll();
    }

    @Override
    public Product save(Product product) {
        productRepository.save(product);
        return product;
    }

    @Override
    public Product findById(Long id) {
        if(productRepository.findById(id).isPresent()){
            return productRepository.findById(id).get();
        }
        return null;
    }

    @Override
    public void delete(Long id) {
        Product product = findById(id);
        productRepository.delete(product);
    }
}
