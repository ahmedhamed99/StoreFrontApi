# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index /products GET
- Show /products/:id GET
- Create [token required] /products POST
- [OPTIONAL] Top 5 most popular products /most-popular-products GET 
- [OPTIONAL] Products by category (args: product category) /products-by-category/:category GET

#### Users
- Index [token required] /users GET
- Show [token required] /users/:id GET
- Create N[token required] /users POST

#### Orders
- Current Order by user (args: user id)[token required] /users/:id/current-orders
- [OPTIONAL] Completed Orders by user (args: user id)[token required] /users/:id/completed-orders

## Database Schema
#### Product
-  id SERIAL PRIMARY KEY
- name VARCAHR
- price integer
- [OPTIONAL] category VARCHAR

#### User
- id SERIAL PRIMARY KEY
- firstName VARCHAR
- lastName VARCHAR
- password VARCHAR

#### Orders
- id SERIAL PRIMARY KEY
- user_id bigint REFERENCES users(id)
- status of order (active or complete) VARCHAR

#### AddProducts
- id SERIAL PRIMARY KEY
- user_id bigint REFERENCES users(id)
- product_id bigint REFERENCES products(id)
- quantity integer

