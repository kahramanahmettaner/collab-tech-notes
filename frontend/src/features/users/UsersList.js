import { useGetUsersQuery } from "./usersApiSlice"
import User from "./User"
import useTitle from "../../hooks/useTitle"
import { PulseLoader } from 'react-spinners'

const UsersList = () => {
  useTitle('Collab Tech Notes: Users')

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error  
  } = useGetUsersQuery('usersList', {
        pollingInterval: 60000,           // Re-query data every minute
        refetchOnFocus: true,             // Refetch data when returning to the browser window
        refetchOnMountOrArgChange: true   // Refetch data upon component remount or argument change
  })

  let content

  if (isLoading) content = <PulseLoader color={'#FFF'} />
  if (isError) content = <p className="errmsg">{error?.data.message}</p>
  
  if (isSuccess) {
    const { ids } = users
    const tableContent = ids?.length && ids.map(userId => <User key={userId} userId={userId} />)
    content = (
      <table className="table table--users">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th user__username">Username</th>
            <th scope="col" className="table__th user__roles">Roles</th>
            <th scope="col" className="table__th user__edit">Edit</th>
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

export default UsersList