import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse } from "@fortawesome/free-solid-svg-icons"
import { useNavigate, useLocation } from 'react-router-dom'
import useAuth from "../hooks/useAuth"
const DashFooter = () => {
    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { timeStyle: 'short' }).format(date)


    const {  status}  = useAuth()

    const navigate = useNavigate()
    const { pathname } = useLocation()

    const onGoHomeClicked = () => navigate('/dash')

    let goHomeButton = null
    if (pathname !== '/dash') {
        goHomeButton = (
            <button
                className="dash-footer__button icon-button"
                title="Home"
                onClick={onGoHomeClicked}
            >
                <FontAwesomeIcon icon={faHouse} className="icon-button-test" />
            </button>
        )
    }

    const content = (
        <footer className="dash-footer">
            {goHomeButton}
            
            <p>⏰:{today}</p>

           {/*  <div className="openclose">
                <p>📖Open:8am-4pm</p>
                <p>📅Days:Mon-Fri</p>
            </div> */}
        </footer>
    )
    return content
}
export default DashFooter