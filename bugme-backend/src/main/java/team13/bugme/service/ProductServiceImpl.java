package team13.bugme.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team13.bugme.entity.ProductsEntity;
import team13.bugme.repository.ProductsRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductsService {

    private final ProductsRepository productsRepository;

    @Autowired
    public ProductServiceImpl(ProductsRepository productsRepository) {
        this.productsRepository = productsRepository;
    }

    @Override
    public ProductsEntity createProduct(ProductsEntity product) {
        return productsRepository.save(product);
    }

    @Override
    public ProductsEntity getProductById(int id) {
        Optional<ProductsEntity> optionalProduct = productsRepository.findById(id);
        if (optionalProduct.isPresent()) {
            return optionalProduct.get();
        } else {
            throw new RuntimeException("Product not found for id :: " + id);
        }
    }

    @Override
    public List<ProductsEntity> getAllProducts() {
        return productsRepository.findAll();
    }

    @Override
    public ProductsEntity updateProductById(int id, ProductsEntity product) {
        Optional<ProductsEntity> optionalProduct = productsRepository.findById(id);
        if (optionalProduct.isPresent()) {
            ProductsEntity existingProduct = optionalProduct.get();
            existingProduct.setName(product.getName());
            existingProduct.setPath(product.getPath());
            existingProduct.setPrice(product.getPrice());
            existingProduct.setDescriptionPlant(product.getDescriptionPlant());
            existingProduct.setDescriptionCare(product.getDescriptionCare());
            existingProduct.setCategory(product.getCategory());
            return productsRepository.save(existingProduct);
        } else {
            throw new RuntimeException("Product not found for id :: " + id);
        }
    }

    @Override
    public void deleteProductById(int id) {
        Optional<ProductsEntity> optionalProduct = productsRepository.findById(id);
        if (optionalProduct.isPresent()) {
            productsRepository.deleteById(id);
        } else {
            throw new RuntimeException("Product not found for id :: " + id);
        }
    }
}

