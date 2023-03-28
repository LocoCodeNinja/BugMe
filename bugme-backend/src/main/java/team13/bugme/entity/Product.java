package team13.bugme.entity;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
public class Product {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id", nullable = false)
    private int id;
    @Basic
    @Column(name = "name", nullable = false, length = 100)
    private String name;
    @Basic
    @Column(name = "path", nullable = false, length = 255)
    private String path;
    @Basic
    @Column(name = "price", nullable = false, precision = 2)
    private BigDecimal price;
    @Basic
    @Column(name = "description_plant", nullable = true, length = 2147483647)
    private String descriptionPlant;
    @Basic
    @Column(name = "description_care", nullable = true, length = 2147483647)
    private String descriptionCare;
    @Basic
    @Column(name = "category", nullable = false, length = 20)
    private String category;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getDescriptionPlant() {
        return descriptionPlant;
    }

    public void setDescriptionPlant(String descriptionPlant) {
        this.descriptionPlant = descriptionPlant;
    }

    public String getDescriptionCare() {
        return descriptionCare;
    }

    public void setDescriptionCare(String descriptionCare) {
        this.descriptionCare = descriptionCare;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
