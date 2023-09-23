import { Link } from "react-router-dom"

const DashLayout = () => {

    const content = (
        <header className="dash-header">
            <div className="dash-header__container">
                <Link to="/dash">
                    <h1 className="dash-hedaer__title">CollabTechNotes</h1>
                </Link>
                <nav className="dash-header__nav">
                    {/* add nav buttons later */}
                </nav>
            </div>
        </header>
    )
    
    return content
}

export default DashLayout