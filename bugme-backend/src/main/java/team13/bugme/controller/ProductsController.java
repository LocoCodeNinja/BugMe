package team13.bugme.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import team13.bugme.entity.ProductsEntity;
import team13.bugme.service.ProductsService;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/products")
public class ProductsController {

    private final ProductsService productsService;

    @Autowired
    public ProductsController(ProductsService productsService) {
        this.productsService = productsService;
    }

    @PostMapping
    public ResponseEntity<ProductsEntity> createProduct(@RequestBody ProductsEntity product) {
        ProductsEntity newProduct = productsService.createProduct(product);
        return new ResponseEntity<>(newProduct, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductsEntity> getProductById(@PathVariable int id) {
        ProductsEntity product = productsService.getProductById(id);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ProductsEntity>> getAllProducts() {
        List<ProductsEntity> productsList = productsService.getAllProducts();
        if (productsList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(productsList, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductsEntity> updateProductById(@PathVariable int id, @RequestBody ProductsEntity product) {
        ProductsEntity updatedProduct = productsService.updateProductById(id, product);
        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductById(@PathVariable int id) {
        productsService.deleteProductById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
