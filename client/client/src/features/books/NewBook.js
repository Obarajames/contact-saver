import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/useraApiSlice'
import NewbookForm from './NewBookForm'

const NewBook = () => {
    const users = useSelector(selectAllUsers)

    if (!users?.length) return <p>Not Currently Available</p>

    const content = <NewbookForm users={users} />

    return content
}
export default NewBook