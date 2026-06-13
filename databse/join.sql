-- Products With Categories

SELECT
    products.name,
    products.price,
    categories.name AS category_name
FROM products
INNER JOIN categories
ON products.category_id = categories.id;

-- User Orders

SELECT
    users.name,
    orders.total_amount
FROM users
INNER JOIN orders
ON users.id = orders.user_id;

-- Product Reviews

SELECT
    products.name,
    users.name AS reviewer,
    reviews.rating,
    reviews.comment
FROM reviews
INNER JOIN users
ON reviews.user_id = users.id
INNER JOIN products
ON reviews.product_id = products.id;