import { useLocation, Navigate, Outlet  } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const RequireAuth = ({ allowedRoles }) => {

    const location = useLocation()
    const { roles } = useAuth()

    const content = (
        roles.some( role => allowedRoles.includes(role) )
            ? <Outlet />
            : <Navigate to='/login' state={{ from: location }} replace /> // removes the RequireAuth component from the history
    )

    return content
}

export default RequireAuth