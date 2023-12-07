import { useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSendLogoutMutation } from '../features/auth/authApiSlice'

const DASH_REGEX = /^\/dash(\/)?$/
const NOTES_REGEX = /^\/dash\/notes(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/

const DashLayout = () => {

    const navigate = useNavigate()
    const { pathname } = useLocation()

    const [sendLogout, { isLoading, isSuccess, isError, error }] = useSendLogoutMutation()

    useEffect(() => { if (isSuccess) navigate('/') }, [isSuccess, navigate])

    const onLogoutClicked = () => sendLogout()

    if (isLoading) return <p>Logging Out...</p>

    if (isError) return <p>Error: { error.data?.message }</p>

    let dashClass = null
    if (!DASH_REGEX.test(pathname) && !NOTES_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
        dashClass = 'dash-header__container--mail'
    }

    const logotButton = (
        <button
            className="icon-button"
            title="Logout"
            onClick={onLogoutClicked}
        >
            <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
    )

    const content = (
        <header className="dash-header">
            <div className={`dash-header__container ${dashClass}`}>
                <Link to="/dash">
                    <h1 className="dash-hedaer__title">CollabTechNotes</h1>
                </Link>
                <nav className="dash-header__nav">
                    {/* add more buttons later */}
                    {logotButton}
                </nav>
            </div>
        </header>
    )
    
    return content
}

export default DashLayout