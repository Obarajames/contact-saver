import { useGetBooksQuery } from "./booksApiSlice"
import Book from "./Book"
import useAuth from "../../hooks/useAuth"

const BooksList = () => {

    const { username, isManager, isAdmin } = useAuth()

    const {
        data: books,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetBooksQuery('booksList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids, entities } = books

        let filteredIds
        if (isManager || isAdmin) {
            filteredIds = [...ids]
        } else {
            filteredIds = ids.filter(bookId => entities[bookId].username === username)
        }

        const tableContent = ids?.length && filteredIds.map(bookId => <Book key={bookId} bookId={bookId} />)

        content = (
            <table className="table table--books">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th book__status">Username</th>
                        <th scope="col" className="table__th book__created">Created</th>
                        <th scope="col" className="table__th book__updated">Updated</th>
                        <th scope="col" className="table__th book__title">Title</th>
                        <th scope="col" className="table__th book__username">Owner</th>
                        <th scope="col" className="table__th book__edit">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }

    return content
}
export default BooksList