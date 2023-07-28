import { store } from '../../app/store'
import { booksApiSlice } from '../books/booksApiSlice'
import { usersApiSlice } from '../users/useraApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
    useEffect(() => {
        console.log('subscribing')
        const books = store.dispatch(booksApiSlice.endpoints.getBooks.initiate())
        const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())

        return () => {
            console.log('unsubscribing')
            books.unsubscribe()
            users.unsubscribe()
        }
    }, [])

    return <Outlet />
}
export default Prefetch