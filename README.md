# API Documentation

## Authentication

### Login

- **Endpoint:** `/api/login/create`
- **Method:** POST
- **Description:** Endpoint to create a login session for users and administrators.
- **Request Body:**
  - `username` (string): Username.
  - `password` (string): Password.

## Users

### CRUD Operations

#### Create User

- **Endpoint:** `/api/v1/users/create`
- **Method:** POST
- **Description:** Creates a new user.
- **Request Body:**
  - `username` (string): Username.
  - `password` (string): Password.
  - `email` (string): Email address.

#### Get Users Page

- **Endpoint:** `/api/v1/users/page/:page/offset/:offset`
- **Method:** GET
- **Description:** Retrieves a page of users.
- **Parameters:**
  - `page` (number): Page number.
  - `offset` (number): Number of users per page.

#### Get User by ID

- **Endpoint:** `/api/v1/users/one/:id`
- **Method:** GET
- **Description:** Retrieves a user by ID.
- **Parameters:**
  - `id` (string): User ID.

#### Update User

- **Endpoint:** `/api/v1/users/update/:id`
- **Method:** PATCH
- **Description:** Updates a user's information.
- **Parameters:**
  - `id` (string): User ID.
- **Request Body:**
  - `username` (string): Updated username.
  - `password` (string): Updated password.
  - `email` (string): Updated email address.

#### Delete User

- **Endpoint:** `/api/v1/users/delete/:id`
- **Method:** DELETE
- **Description:** Deletes a user by ID.
- **Parameters:**
  - `id` (string): User ID.

## Products

### CRUD Operations

#### Create Product

- **Endpoint:** `/api/v1/products/create`
- **Method:** POST
- **Description:** Creates a new product.
- **Request Body:**
  - `name` (string): Product name.
  - `description` (string): Product description.
  - `price` (number): Product price.

#### Get Product by ID

- **Endpoint:** `/api/v1/products/one/:id`
- **Method:** GET
- **Description:** Retrieves a product by ID.
- **Parameters:**
  - `id` (string): Product ID.

#### Update Product

- **Endpoint:** `/api/v1/products/update/:id`
- **Method:** PATCH
- **Description:** Updates a product's information.
- **Parameters:**
  - `id` (string): Product ID.
- **Request Body:**
  - `name` (string): Updated product name.
  - `description` (string): Updated product description.
  - `price` (number): Updated product price.

#### Delete Product

- **Endpoint:** `/api/v1/products/delete/:id`
- **Method:** DELETE
- **Description:** Deletes a product by ID.
- **Parameters:**
  - `id` (string): Product ID.

## Orders

### CRUD Operations

#### Create Order

- **Endpoint:** `/api/v1/orders/create`
- **Method:** POST
- **Description:** Creates a new order.
- **Request Body:**
  - `userId` (string): User ID placing the order.
  - `products` (array): Array of product IDs in the order.
  - `total` (number): Total price of the order.

#### Get Order by ID

- **Endpoint:** `/api/v1/orders/one/:id`
- **Method:** GET
- **Description:** Retrieves an order by ID.
- **Parameters:**
  - `id` (string): Order ID.

#### Update Order

- **Endpoint:** `/api/v1/orders/update/:id`
- **Method:** PATCH
- **Description:** Updates an order's information.
- **Parameters:**
  - `id` (string): Order ID.
- **Request Body:**
  - `userId` (string): Updated user ID placing the order.
  - `products` (array): Updated array of product IDs in the order.
  - `total` (number): Updated total price of the order.

#### Delete Order

- **Endpoint:** `/api/v1/orders/delete/:id`
- **Method:** DELETE
- **Description:** Deletes an order by ID.
- **Parameters:**
  - `id` (string): Order ID.

## Images

### Upload Product Images

- **Endpoint:** `/api/v1/products/images/create`
- **Method:** POST
- **Description:** Uploads images for a product.
- **Request Body:**
  - `images` (files): Images to upload for the product.

## Authentication

### Create Login Session

- **Endpoint:** `/api/login/create`
- **Method:** POST
- **Description:** Creates a login session.
- **Request Body:**
  - `username` (string): Username.
  - `password` (string): Password.
