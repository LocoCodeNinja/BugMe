package team13.bugme.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import team13.bugme.model.Product;
import team13.bugme.service.ProductService;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1")
public class ProductController {
    @Autowired
    ProductService productService;

    @GetMapping("/products")
    public ResponseEntity<List<Product>> get(){
        List<Product> products = productService.findAll();

        return new ResponseEntity<List<Product>>(products, HttpStatus.OK);
    }
    @PostMapping("/products")
    public ResponseEntity<Product> save(@RequestBody Product product) {
        Product productOne = productService.save(product);
        return new ResponseEntity<Product>(productOne, HttpStatus.CREATED);
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<Product> get(@PathVariable("id") Long id) {
        Product product = productService.findById(id);
        return new ResponseEntity<Product>(product, HttpStatus.OK);
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") Long id) {
        productService.delete(id);
        return new ResponseEntity<String>("Product deleted successfully.!", HttpStatus.OK);
    }
}
