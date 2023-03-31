USE master;
GO

IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'Team13_BugMe')
BEGIN
    CREATE DATABASE Team13_BugMe;
END
GO

USE Team13_BugMe;
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[account]') AND type in (N'U'))
BEGIN
CREATE TABLE account (
    id INT IDENTITY(1,1) PRIMARY KEY,
    username NVARCHAR(50) NOT NULL UNIQUE,
    password NVARCHAR(255) NOT NULL,
    role NVARCHAR(20) NOT NULL
);
END
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[product]') AND type in (N'U'))
BEGIN
    CREATE TABLE product (
        id INT IDENTITY(1,1) PRIMARY KEY,
        name NVARCHAR(100) NOT NULL,
        path NVARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        description_plant NVARCHAR(MAX) NULL,
        description_care NVARCHAR(MAX) NULL,
        category NVARCHAR(20) NOT NULL
    );
END
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[bug]') AND type in (N'U'))
BEGIN
    CREATE TABLE bug (
        id INT PRIMARY KEY,
        severity VARCHAR(10) NOT NULL,
		title VARCHAR(100)
    );
END
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[accountBug]') AND type in (N'U'))
BEGIN
    CREATE TABLE accountBug (
        id INT IDENTITY(1,1) PRIMARY KEY,
        bug_id INT NOT NULL,
        account_id INT NOT NULL,
        bug_enabled BIT,
        FOREIGN KEY (bug_id) REFERENCES bug(id),
        FOREIGN KEY (account_id) REFERENCES account(id)
    );
END
GO

INSERT INTO account (username, password, role)
VALUES
    ('teacher', '!teacher123', 'Teacher'),
    ('employee', 'employee123', 'Employee'),
    ('customer', 'customer123', 'User');
GO

INSERT INTO product (name, path, price, description_plant, description_care, category)
VALUES
    ('Succulent', 'assets/StockPhotos/Succulent.jpg', 14.99, 'A quirky plant that''s all the rage with millennials. With plump leaves and spiky personalities, succulents add a fun touch of greenery to any space.', 'Water every 2-3 weeks when the soil is completely dry. Keep in bright, indirect light and avoid direct sunlight. Prefer warmer temperatures.', 'Tiny'),
    ('Sunflower', 'assets/StockPhotos/Sunflower.jpg', 19.99, 'A symbol of optimism and sunshine. They turn their heads to follow the sun throughout the day, making them the ultimate plant-based sun worshippers.', 'Require at least 6-8 hours of direct sunlight per day. Keep the soil moist but not waterlogged. Deadhead spent blooms regularly to encourage new growth.', 'Large'),
    ('Aloe Vera', 'assets/StockPhotos/AloeVera.jpg', 14.99, 'A plant that doubles as a skincare secret weapon. With its cooling, soothing gel that can help heal sunburns and other skin irritations, this spiky succulent is a must-have for any green-thumbed beauty enthusiast.', 'Thrive in bright, indirect sunlight. Allow the soil to dry out completely between waterings. Sensitive to cold temperatures.', 'Small'),
    ('Hosta', 'assets/StockPhotos/Hosta.jpg', 24.99, 'As graceful as it is tough. With elegant leaves in shades of green, blue, and even yellow, hostas can thrive in shady spots. A favorite snack of deer.', 'Prefer shaded areas and soil that is consistently moist but well-drained. Water deeply once a week. Remove dead leaves and flowers regularly.', 'Large'),
    ('Rose', 'assets/StockPhotos/Rose.jpg', 11.99, 'The queen of the flower world. With delicate petals and heavenly scent, roses have been revered for centuries as a symbol of love and beauty. Whether you prefer classic red roses or more unexpected hues like peach or lavender, these blooms are always in style.', 'Need at least 6 hours of direct sunlight per day. Water deeply once a week and make sure the soil drains well. Prune regularly to promote healthy growth and remove any dead or damaged branches.', 'Small'),
    ('Hydrangea', 'assets/StockPhotos/Hydrangea.jpg', 11.99, 'As showy as it is hardy. With fluffy clusters of flowers in shades of pink, blue, and white, hydrangeas are the ultimate garden statement piece. And if you''re lucky enough to live in an area with acidic soil, you can even play around with the color of their blooms.', 'Prefer partial shade and moist, well-drained soil. Water deeply once a week and avoid letting the soil dry out completely. Prune after blooming to encourage new growth.', 'Small'),
    ('Tulip', 'assets/StockPhotos/Tulip.jpg', 9.99, 'Few flowers can match the elegance of a tulip. With their long, slender stems and softly rounded petals, tulips add a touch of grace to any bouquet or garden bed. And with their wide range of colors and varieties, there''s a tulip for every taste and occasion.', 'Plant tulips in the fall, at least 6-8 weeks before the ground freezes. Choose a spot with well-draining soil and full sun. Water the bulbs thoroughly after planting, and keep the soil moist but not waterlogged. After the tulips have finished blooming, allow the leaves to yellow and wither before removing them.', 'Medium'),
    ('Windflower', 'assets/StockPhotos/Windflower.jpg', 14.99, 'With their delicate, feathery blooms and whimsical, wind-blown appearance, windflowers add a touch of magic to any garden or bouquet. Also known as anemones, these flowers come in a wide range of colors and varieties, from classic white to bold pink and purple.', 'Plant windflowers in the fall or spring, in a spot with partial to full sun and well-draining soil. Water them deeply once a week and make sure the soil doesn''t dry out completely. After the flowers have finished blooming, remove the dead blooms to encourage new growth.', 'Tiny'),
    ('Geranium', 'assets/StockPhotos/Geranium.jpg', 14.99, 'If you''re looking for a plant that''s as tough as it is pretty, the geranium is your go-to. With their bright, colorful blooms and hardy nature, geraniums are a favorite of gardeners worldwide. Plus, they''re relatively easy to care for, making them a great option for beginners.', 'Geraniums prefer full sun to partial shade and well-drained soil. Water them deeply once a week and avoid letting the soil dry out completely. Deadhead spent blooms regularly to encourage new growth.', 'Small'),
    ('Lavender', 'assets/StockPhotos/Lavender.jpg', 19.99, 'Looking for a plant that can help you relax and unwind after a long day? Look no further than the lavender plant. With its soothing fragrance and delicate purple blooms, lavender is a favorite of aromatherapy enthusiasts and gardeners alike. Plus, it''s relatively low-maintenance, making it a great option for busy folks.', 'Lavender prefers full sun and well-drained soil. Water it deeply once a week and avoid letting the soil dry out completely. Prune the plant regularly to encourage bushy growth.', 'Medium'),
    ('Orchid', 'assets/StockPhotos/Orchid.jpg', 29.99, 'If you''re looking for a plant that''s as exotic as it is beautiful, the orchid is your pick. With its intricate blooms and delicate, arching stems, the orchid is a favorite of plant collectors and interior designers alike. And while orchids can be a bit finicky, with the right care they can thrive for years to come.', 'Orchids prefer bright, indirect sunlight and well-drained soil. Water them once a week and avoid letting the soil dry out completely. Mist the plant regularly to increase humidity around it.', 'Medium'),
    ('Parrot Flower', 'assets/StockPhotos/ParrotFlower.jpg', 9.99, 'Looking for a plant that''s as showy as it is unique? Say hello to the parrot flower. With its vibrant, tropical blooms and long, trailing stems, this plant is a favorite of gardeners who love to make a statement. And while it may look fussy, the parrot flower is actually relatively easy to care for.', 'Parrot flowers prefer partial shade and well-drained soil. Water them deeply once a week and avoid letting the soil dry out completely. Fertilize the plant regularly to encourage blooming.', 'Medium'),
    ('Strawflower', 'assets/StockPhotos/Strawflower.jpg', 7.99, 'If you''re looking for a plant that''s as hardy as it is pretty, the strawflower is a great choice. With its daisy-like blooms and long, sturdy stems, the strawflower is a favorite of gardeners who love to create their own bouquets. Plus, it''s relatively low-maintenance, making it a great option for busy folks.', 'Strawflowers prefer full sun and well-drained soil. Water them deeply once a week and avoid letting the soil dry out completely. Deadhead spent blooms regularly to encourage new growth.', 'Tiny'),
    ('Caradonna', 'assets/StockPhotos/Caradonna.jpg', 17.99, 'Caradonna is a perennial plant that blooms in the summer with striking dark purple flowers on tall spikes. The plant itself has dark green leaves that provide a nice contrast to the purple flowers. This plant is great for attracting pollinators like bees and butterflies to your garden.', 'Caradonna prefers full sun but can tolerate some shade. Keep the soil moist but not waterlogged. Deadhead spent blooms regularly to encourage new growth.', 'Medium'),
    ('Cosmos', 'assets/StockPhotos/Cosmos.jpg', 14.99, 'Cosmos are annual plants that produce beautiful daisy-like flowers in shades of pink, white, and red. They are easy to grow and require little maintenance, making them a great choice for beginner gardeners.', 'Cosmos prefer full sun and well-drained soil. Water them deeply once a week and avoid letting the soil dry out completely. Deadhead spent blooms regularly to encourage new growth.', 'Medium'),
    ('Dahlia', 'assets/StockPhotos/Dahlia.jpg', 19.99, 'Dahlias are a favorite among gardeners for their large, showy blooms in a wide range of colors and shapes. They are perennials that bloom from mid-summer to fall and can add a touch of drama to any garden.', 'Dahlias prefer full sun and well-drained soil. Water them deeply once a week and avoid letting the soil dry out completely. Deadhead spent blooms regularly to encourage new growth.', 'Large'),
    ('Daisy', 'assets/StockPhotos/Daisy.jpg', 9.99, 'Daisies are perennial plants that produce charming white or yellow flowers with a yellow center. They are easy to grow and can brighten up any garden with their cheerful blooms.', 'Daisies prefer full sun but can tolerate some shade. Keep the soil moist but not waterlogged. Deadhead spent blooms regularly to encourage new growth.', 'Tiny'),
    ('Moonfire', 'assets/StockPhotos/Moonfire.jpg', 24.99, 'Moonfire is a stunning perennial plant that produces fiery orange-red blooms on tall, sturdy stems. This plant is a favorite of gardeners who love to create bold, eye-catching displays in their garden or cut flower arrangements.', 'Moonfire prefers full sun to partial shade and well-drained soil. Water deeply once a week and avoid letting the soil dry out completely. Deadhead spent blooms regularly to encourage new growth.', 'Large'),
    ('Day Lily', 'assets/StockPhotos/Daylily.jpg', 14.99, 'Daylilies are perennial plants that bloom in a wide range of colors, from yellow and orange to pink and red. They are easy to grow and can add a pop of color to any garden.', 'Daylilies prefer full sun to partial shade and well-drained soil. Water them deeply once a week and avoid letting the soil dry out completely. Deadhead spent blooms regularly to encourage new growth.', 'Medium'),
    ('Forget Me Not', 'assets/StockPhotos/ForgetMeNot.jpg', 7.99, 'Forget-me-nots are charming little plants that produce small blue or pink flowers in the spring. They are great for adding a touch of whimsy to any garden.', 'Forget-me-nots prefer partial shade and moist, well-drained soil. Water them deeply once a week and avoid letting the soil dry out completely. Deadhead spent blooms regularly to encourage new growth.', 'Tiny');

INSERT INTO bug (id, severity, title) VALUES
    (11, 'Low', 'Wrong Store Hours'),
    (12, 'Low', 'Description Loads Twice'),
    (13, 'Low', 'Employee Buttons Overlap'),
    (14, 'Low', 'Wrong Product Image'),
    (21, 'Medium', 'One Product Slow Load'),
    (22, 'Medium', 'No Hover Interaction'),
    (23, 'Medium', 'Search Malfunction'),
    (24, 'Medium', 'Category Tab Wont Open'),
    (31, 'High', 'Null Names'),
    (32, 'High', 'Cart Slow Load'),
    (33, 'High', 'Null Icons'),
    (34, 'High', 'Same Image All Products '),
    (41, 'Critical', 'Dead Links'),
    (42, 'Critical', 'Employee Panel Bad Gateway'),
    (43, 'Critical', 'Cart Infinite Load'),
    (44, 'Critical', 'Subscribe Unloads All Products');