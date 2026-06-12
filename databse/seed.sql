-- Categories

INSERT INTO categories(name)
VALUES
('Electronics'),
('Gaming'),
('Accessories');

-- Products

INSERT INTO products(name,price,category_id)
VALUES
('Laptop',50000,1),
('Phone',20000,1),
('Headphones',3000,3),
('Keyboard',2000,3),
('Gaming Mouse',1500,2);

-- Users

INSERT INTO users(name,email)
VALUES
('Rahul','rahul@gmail.com'),
('Amit','amit@gmail.com'),
('Priyanshu','priyanshu@gmail.com');

-- Orders

INSERT INTO orders(user_id,total_amount)
VALUES
(1,50000),
(1,20000),
(2,10000);

-- Reviews

INSERT INTO reviews(user_id,product_id,rating,comment)
VALUES
(1,1,5,'Excellent Product'),
(2,2,4,'Good Product'),
(3,1,5,'Worth Buying');