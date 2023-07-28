import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectBookById } from './booksApiSlice'
import { selectAllUsers } from '../users/useraApiSlice'
import EditBookForm from './EditBookForm'
import Loadertwo from "../../components/loadertwo"
const EditBook = () => {
    const { id } = useParams()

    const book = useSelector(state => selectBookById(state, id))
    const users = useSelector(selectAllUsers)

    const content = book && users ? <EditBookForm book={book} users={users} /> : <p className='loader2'><Loadertwo/>Loading...</p>

    return content
}
export default EditBook