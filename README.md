# Book API

## Overview

This is a simple RESTful API for managing a collection of books. It is built with Node.js, Express, and MongoDB (using Mongoose). The API allows users to create, retrieve, update, and delete book records.

## Endpoints

### Books

- **GET **`` - /books => Fetch all books
- **POST **`` - /books => Add a new book
- **GET **`` - /books/:id => Get details of a specific book
- **PUT **`` - /books/:id => Update a book
- **DELETE **`` - /books/:id => Remove a book

### Recommendations

- **POST **`` - /recommendation => Gives back recommended books based on input

## MongoDB Integration

Books are stored in MongoDB using Mongoose. The schema includes:

```js
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true, index: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    genres: { type: [String], required: true, index: true },  
    reviews: [{ name: String, review: String }]
});
```

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/book-api.git
   cd book-api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up MongoDB connection in `server.js`.
4. Run the server:
   ```bash
   npm run serve
   ```

## Deployment

This project can be deployed on Vercel. Ensure `vercel.json` routes all requests to `server.js`.

## License

This project is open-source under the MIT License.

