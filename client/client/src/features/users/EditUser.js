import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserById } from './useraApiSlice'
import EditUserForm from './EditUserForm'
import Loadertwo from '../../components/loadertwo'


const EditUser = () => {
    const { id } = useParams()

    const user = useSelector(state => selectUserById(state, id))

    const content = user ? <EditUserForm user={user} /> : <p className='loader2'><Loadertwo/>Loading...</p>

    return content
}
export default EditUser