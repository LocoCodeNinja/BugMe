/* DB Creation */
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'Team13_BugMe')
BEGIN
    CREATE DATABASE Team13_BugMe;
END
GO

USE Team13_BugMe;
GO

/* Table Creation */
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[users]') AND type in (N'U'))
BEGIN
    CREATE TABLE users (
        id INT PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        password VARCHAR(50) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'User'
    );
END
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[products]') AND type in (N'U'))
BEGIN
    CREATE TABLE products (
        id INT IDENTITY(1,1) PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        path VARCHAR(50) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        description_plant TEXT NULL,
        description_care TEXT NULL,
        category VARCHAR(50) NOT NULL
    );
END
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[bugs]') AND type in (N'U'))
BEGIN
    CREATE TABLE bugs (
        id INT PRIMARY KEY,
        priority INT NOT NULL
    );
END
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[accountBugs]') AND type in (N'U'))
BEGIN
    CREATE TABLE accountBugs (
        id INT IDENTITY(1,1) PRIMARY KEY,
        bug_id INT NOT NULL,
        account_id INT NOT NULL,
        bug_enabled BIT,
        FOREIGN KEY (bug_id) REFERENCES bugs(id),
        FOREIGN KEY (account_id) REFERENCES users(id)
    );
END
GO

/* Inserts */
INSERT INTO users (id, username, password, role)
VALUES
	(1, 'teacher', '!teacher123', 'Teacher'),
	(2, 'employee', 'employee123', 'Employee'),
	(3, 'customer', 'customer123', 'User');
GO

INSERT INTO products (name, path, price, description_plant, description_care, category)
VALUES
    ('Succulent', 'assets/StockPhotos/Succulent.jpg', 14.99, 'Meet the succulent, the quirky plant that''s all the rage with millennials. With their plump leaves and spiky personalities, succulents add a fun touch of greenery to any space. Just be careful not to overwater them - they''re desert dwellers, after all.', 'Water your succulent every 2-3 weeks or when the soil is completely dry. Keep them in bright, indirect light and avoid exposing them to direct sunlight. Succulents prefer warmer temperatures but can survive in cooler conditions as well.', 'Tiny'),
    ('Sunflower', 'assets/StockPhotos/Sunflower.jpg', 19.99, 'This flower is more than just a pretty face. With their cheerful yellow petals and towering stalks, sunflowers are a symbol of optimism and sunshine. They turn their heads to follow the sun throughout the day, making them the ultimate plant-based sun worshippers.', 'Sunflowers require a lot of sunlight - at least 6-8 hours of direct sunlight per day. Keep the soil moist but not waterlogged. Deadhead spent blooms regularly to encourage new growth.', 'Large'),
    ('Aloe Vera', 'assets/StockPhotos/AloeVera.jpg', 14.99, 'Looking for a plant that doubles as a skincare secret weapon? Look no further than the aloe vera. With its cooling, soothing gel that can help heal sunburns and other skin irritations, this spiky succulent is a must-have for any green-thumbed beauty enthusiast.', 'Aloe vera plants thrive in bright, indirect sunlight. Allow the soil to dry out completely between waterings, and be careful not to overwater as this can lead to root rot. Aloe vera plants are sensitive to cold temperatures, so keep them in a warm area.', 'Small'),
    ('Hosta', 'assets/StockPhotos/Hosta.jpg', 24.99, 'If you''re looking for a plant that''s as graceful as it is tough, the hosta is your gal. With its elegant leaves that come in shades of green, blue, and even yellow, hostas can thrive in shady spots where other plants might struggle. Plus, they''re a favorite snack of deer, so you know they''re delicious.', 'Hostas prefer shaded areas and soil that is consistently moist but well-drained. Water them deeply once a week and make sure the soil doesn''t dry out completely. Remove dead leaves and flowers regularly to keep the plant healthy.', 'Large'),
    ('Rose', 'assets/StockPhotos/Rose.jpg', 11.99, 'Ah, the rose - the queen of the flower world. With their delicate petals and heavenly scent, roses have been revered for centuries as a symbol of love and beauty. Whether you prefer classic red roses or more unexpected hues like peach or lavender, these blooms are always in style.', 'Roses need at least 6 hours of direct sunlight per day. Water them deeply once a week and make sure the soil drains well. Prune your rose bushes regularly to promote healthy growth and remove any dead or damaged branches.', 'Small'),
    ('Hydrangea', 'assets/StockPhotos/Hydrangea.jpg', 11.99, 'Looking for a plant that''s as showy as it is hardy? Meet the hydrangea. With their fluffy clusters of flowers in shades of pink, blue, and white, hydrangeas are the ultimate garden statement piece. And if you''re lucky enough to live in an area with acidic soil, you can even play around with the color of their blooms. Now that''s what we call plant magic.', 'Hydrangeas prefer partial shade and moist, well-drained soil. Water them deeply once a week and avoid letting the soil dry out completely. Prune your hydrangeas after they have finished blooming to encourage new growth.', 'Small');