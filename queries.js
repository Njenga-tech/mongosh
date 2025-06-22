// =========================
// 📂 Task 2: Basic CRUD Operations
// =========================

// 1. Find all books in a specific genre (e.g., "Programming")
db.books.find({ genre: "Programming" })

// 2. Find books published after the year 2015
db.books.find({ published_year: { $gt: 2015 } })

// 3. Find books by a specific author (e.g., "Jane Smith")
db.books.find({ author: "Jane Smith" })

// 4. Update the price of a specific book (e.g., "React and Beyond")
db.books.updateOne(
  { title: "React and Beyond" },
  { $set: { price: 499.99 } }
)

// 5. Delete a book by its title (e.g., "The Coding Journey")
db.books.deleteOne({ title: "The Coding Journey" })


// =========================
// 📂 Task 3: Advanced Queries
// =========================

// 6. Find books that are both in stock and published after 2010
db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 }
})

// 7. Use projection to return only title, author, and price
db.books.find({}, {
  _id: 0,
  title: 1,
  author: 1,
  price: 1
})

// 8. Sort books by price in ascending order
db.books.find().sort({ price: 1 })

// 9. Sort books by price in descending order
db.books.find().sort({ price: -1 })

// 10. Limit and skip: show first 5 books (Page 1)
db.books.find().skip(0).limit(5)

// 11. Limit and skip: show next 5 books (Page 2)
db.books.find().skip(5).limit(5)


// =========================
// 📂 Task 4: Aggregation Pipelines
// =========================

// 12. Calculate average price of books by genre
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      average_price: { $avg: "$price" }
    }
  }
])

// 13. Find the author with the most books
db.books.aggregate([
  {
    $group: {
      _id: "$author",
      total_books: { $sum: 1 }
    }
  },
  { $sort: { total_books: -1 } },
  { $limit: 1 }
])

// 14. Group books by publication decade and count them
db.books.aggregate([
  {
    $group: {
      _id: {
        $concat: [
          { $toString: { $multiply: [{ $floor: { $divide: ["$published_year", 10] } }, 10] } },
          "s"
        ]
      },
      count: { $sum: 1 }
    }
  }
])


// =========================
// 📂 Task 5: Indexing
// =========================

// 15. Create index on title
db.books.createIndex({ title: 1 })

// 16. Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 })

// 17. Use explain() to show performance improvement with index
db.books.find({ title: "React and Beyond" }).explain("executionStats")
