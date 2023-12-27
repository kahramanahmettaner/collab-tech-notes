import NewNoteForm from "./NewNoteForm"
import { useGetUsersQuery } from "../users/usersApiSlice"

const NewNote = () => {
  
    const { users } = useGetUsersQuery('usersList', {
        selectFromResult:({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        })
    })

    if (!users?.length) return <p>Not Currently Available</p>

    const content = <NewNoteForm users={users} />

    return content
}

export default NewNote