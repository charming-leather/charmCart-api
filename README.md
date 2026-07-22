# charmCart-api
Backend API for the CharmCart e-commerce platform, managing products, inventory, and WhatsApp order generation.
# CharmCart API

## Overview

CharmCart API is a Node.js and Express.js backend application developed for the CharmCart e-commerce platform. The API provides RESTful endpoints for managing products, shopping carts, wishlists, customer orders, and the checkout process. Instead of processing online payments, the system generates a WhatsApp order message that is sent to the business owner for manual order processing.

The project follows a layered architecture consisting of routes, controllers, repositories, middleware, and custom error handling to ensure the code is modular, maintainable, and easy to extend.

---

# Features

* Product management (Create, Read, Update and Delete)
* Shopping cart management
* Wishlist management
* Customer order management
* Checkout process
* WhatsApp order message generation
* Custom API error handling
* Request logging middleware
* Cart validation middleware
* Global error handling middleware
* RESTful API architecture
* Jest unit testing
* Postman API testing

---

# Technologies Used

* Node.js
* Express.js
* JavaScript
* Jest
* Postman
* Git
* GitHub
* dotenv
* CORS

---

# Project Structure

```text
CharmCart-API
│
├── src
│   ├── config
│   ├── controllers
│   ├── errors
│   ├── middleware
│   ├── models
│   ├── repository
│   ├── routes
│   └── server.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

# API Modules

## Products

Manage the product catalogue.

Endpoints:

* GET /api/products
* GET /api/products/:id
* POST /api/products
* PUT /api/products/:id
* DELETE /api/products/:id

---

## Cart

Manage customer shopping cart items.

Endpoints:

* GET /api/cart
* POST /api/cart
* PUT /api/cart/:productId
* PATCH /api/cart/:productId/quantity
* DELETE /api/cart/:productId

---

## Wishlist

Save products for future purchase.

Endpoints:

* GET /api/wishlist
* POST /api/wishlist
* DELETE /api/wishlist/:productId
* POST /api/wishlist/:productId/move-to-cart

---

## Orders

Manage customer orders.

Endpoints:

* GET /api/orders
* GET /api/orders/:id
* POST /api/orders
* PATCH /api/orders/:id/status

---

## Checkout

Process customer checkout information.

Endpoints:

* POST /api/checkout
* GET /api/checkout/:reference

---

## WhatsApp

Generate WhatsApp order messages for the business owner.

Endpoints:

* POST /api/whatsapp/generate
* GET /api/whatsapp/:orderId

---

# Middleware

### Logger Middleware

Logs every incoming request, including the HTTP method and requested URL.

### Validation Middleware

Validates shopping cart requests by checking that a product ID and valid quantity have been provided.

### Error Middleware

Handles application errors centrally and returns consistent JSON error responses to the client.

---

# Error Handling

The application uses a custom `ApiError` class to standardise error responses.

Supported HTTP errors include:

* 400 Bad Request
* 401 Unauthorized
* 403 Forbidden
* 404 Not Found
* 409 Conflict
* 500 Internal Server Error

---

# Testing

The project includes Jest unit tests for all controller modules.

Controllers tested include:

* Product Controller
* Cart Controller
* Wishlist Controller
* Orders Controller
* Checkout Controller
* WhatsApp Controller

API endpoints were also tested using Postman to verify:

* Successful requests
* Input validation
* Error handling
* CRUD operations
* Checkout workflow
* WhatsApp message generation

---

# Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the project folder:

```bash
cd charmCart-api
```

Install dependencies:

```bash
npm install
```

Create a `.env` file and configure the required environment variables, for example:

```env
PORT=5000
WHATSAPP_NUMBER=27123456789
```

Start the development server:

```bash
npm start
```

The API will run on:

```text
http://localhost:5000
```

---

# Running Tests

Run the Jest test suite using:

```bash
npm test
```

---

# Future Improvements

* Connect to a MongoDB or MySQL database.
* Implement user authentication and authorization.
* Add secure online payment integration.
* Upload and manage product images.
* Improve inventory management.
* Add customer accounts and order history.
* Deploy the API to a cloud hosting platform.

---

# Author

Developed as part of a Workplace Integrated Learning (WIL) Software Engineering project to demonstrate backend API development using Node.js, Express.js, RESTful principles, software testing, and clean software architecture.
