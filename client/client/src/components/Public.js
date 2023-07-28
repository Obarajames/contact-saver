import { Link } from 'react-router-dom'
import logo from "../img/public.jpg"
import Loadertwo from './loadertwo'
const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1> <span className="nowrap">Contact Saver</span></h1>
                <footer>
                    <Link to="/login">Login</Link>
                </footer>
            </header>
            <hr></hr>
            <main className="public__main">
                
                <div className=''>
                    <img src={logo} className="App-logo" alt="logo" />
                </div>

                <div>
                    <h4>HELLO && WELCOME  </h4>
                    <div className='loadertwo'>
                        <Loadertwo/>
                    </div>
                    <p>Contact saver"locking your contact, Unlocking your future ",</p>


                   
                    <br />
                    <p>By James</p>
                </div>
                
            </main>

        </section>

    )
    return content
}
export default Public