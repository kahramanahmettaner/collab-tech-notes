import { store } from '../../app/store'
import { notesApiSlice } from '../notes/notesApiSlice'
import { usersApiSlice } from '../users/usersApiSlice'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const Prefetch = () => {

    // Upon mounting, a manual subscription is initiated
    // Upon destruction, the subscription is unsubscribed
    useEffect(() => {
        console.log('subscribing')
        const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate()) // a manual subscription is initiated with initiate() method
        const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate()) // a manual subscription is initiated with initiate() method

        return () => {
            console.log('unsubscribing')
            notes.unsubscribe()
            users.unsubscribe()
        }
    }, [])

    return <Outlet />
}

export default Prefetch