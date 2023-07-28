import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectBookById } from './booksApiSlice'

const Book = ({ bookId }) => {

    const book = useSelector(state => selectBookById(state, bookId))

    const navigate = useNavigate()

    if (book) {
        const created = new Date(book.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const updated = new Date(book.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dash/books/${bookId}`)

        return (
            <tr className="table__row">
                <td className="table__cell book__status">
                    {book.completed
                        ? <span className="book__status--completed">Completed</span>
                        : <span className="book__status--open">Open</span>
                    }
                </td>
                <td className="table__cell book__created">{created}</td>
                <td className="table__cell book__updated">{updated}</td>
                <td className="table__cell book__title">{book.title}</td>
                <td className="table__cell book__username">{book.username}</td>

                <td className="table__cell">
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )

    } else return null
}
export default Book