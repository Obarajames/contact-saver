const Book = require('../models/Books')
const User = require('../models/User')

// @desc Get all books 
// @route GET /books
// @access Private
const getAllBooks = async (req, res) => {
    // Get all books from MongoDB
    const books = await Book.find().lean()

    // If no books 
    if (!books?.length) {
        return res.status(400).json({ message: 'No books found' })
    }

    // Add username to each book before sending the response 
    // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE 
    // You could also do this with a for...of loop
    const booksWithUser = await Promise.all(books.map(async (book) => {
        const user = await User.findById(book.user).lean().exec()
        return { ...book, username: user.username }
    }))

    res.json(booksWithUser)
}

// @desc Create new book
// @route POST /books
// @access Private
const createNewBook = async (req, res) => {
    const { user, title, text } = req.body

    // Confirm data
    if (!user || !title || !text) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate title
    const duplicate = await Book.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate book title' })
    }

    // Create and store the new user 
    const book = await Book.create({ user, title, text })

    if (book) { // Created 
        return res.status(201).json({ message: 'New book created' })
    } else {
        return res.status(400).json({ message: 'Invalid book data received' })
    }

}

// @desc Update a book
// @route PATCH /books
// @access Private
const updateBook = async (req, res) => {
    const { id, user, title, text, completed } = req.body

    // Confirm data
    if (!id || !user || !title || !text || typeof completed !== 'boolean') {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm book exists to update
    const book = await Book.findById(id).exec()

    if (!book) {
        return res.status(400).json({ message: 'Book not found' })
    }

    // Check for duplicate title
    const duplicate = await Book.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

    // Allow renaming of the original book 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate book title' })
    }

    book.user = user
    book.title = title
    book.text = text
    book.completed = completed

    const updatedBook = await book.save()

    res.json(`'${updatedBook.title}' updated`)
}

// @desc Delete a book
// @route DELETE /books
// @access Private
const deleteBook = async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Book ID required' })
    }

    // Confirm book exists to delete 
    const book = await Book.findById(id).exec()

    if (!book) {
        return res.status(400).json({ message: 'Book not found' })
    }

    const result = await book.deleteOne()

    const reply = `Book '${result.title}' with ID ${result._id} deleted`

    res.json(reply)
}

module.exports = {
    getAllBooks,
    createNewBook,
    updateBook,
    deleteBook
}