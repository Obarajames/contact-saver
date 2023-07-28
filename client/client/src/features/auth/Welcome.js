import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import Phone from "../../img/phone.jpg"

const Welcome = () => {


    const { username, isManager, isAdmin } = useAuth()

   

    const content = (
        <section className="welcome">
            <div className='weltitle'>
               
                <h1>Welcome 📵{username}!</h1>
            </div>

            <div className='welflex'>
                <div>
                    <img className='library-img' src={Phone} alt='library image' />
                </div>
                <div>
                    <h4>“Save People you will like to Remember"</h4>
                    <p>If you want something said, ask a man; if you want something done, ask a woman.</p>
                    {/* <p><Link to="/dash/books">🔗View Books</Link></p> */}

                    {/* <p><Link to="/dash/books/new">🔗Add a new Book</Link></p> */}

                      <p><Link to="/dash/users">🔗View Members Available</Link></p>

                      <p><Link to="/dash/users/new">🔗Add a new user</Link></p>

                </div>
            </div>

        </section>
    )

    return content
}
export default Welcome