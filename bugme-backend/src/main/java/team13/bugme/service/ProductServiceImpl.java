package team13.bugme.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team13.bugme.entity.Product;
import team13.bugme.repository.ProductRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product getProductById(int id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isPresent()) {
            return optionalProduct.get();
        } else {
            throw new RuntimeException("Product not found for id :: " + id);
        }
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product updateProductById(int id, Product product) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isPresent()) {
            Product existingProduct = optionalProduct.get();
            existingProduct.setName(product.getName());
            existingProduct.setPath(product.getPath());
            existingProduct.setPrice(product.getPrice());
            existingProduct.setDescriptionPlant(product.getDescriptionPlant());
            existingProduct.setDescriptionCare(product.getDescriptionCare());
            existingProduct.setCategory(product.getCategory());
            return productRepository.save(existingProduct);
        } else {
            throw new RuntimeException("Product not found for id :: " + id);
        }
    }

    @Override
    public void deleteProductById(int id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isPresent()) {
            productRepository.deleteById(id);
        } else {
            throw new RuntimeException("Product not found for id :: " + id);
        }
    }
}

