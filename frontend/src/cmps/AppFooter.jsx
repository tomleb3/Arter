import { Link } from 'react-router-dom'

export function AppFooter() {
    return <footer>
        <div className="content main-layout flex j-between a-center">
            <section>
                <div className="logo"><Link to="/">Arter</Link></div>
                <h3>is an online marketplace created with the artist in mind.</h3>
                <h3>Our application gives artists, both amateur and professional,</h3>
                <h3>a social platform to share and sell their art with the world.</h3>
            </section>
            <section>
                <p>Meet the team</p>
                <div className="flex col">
                    <Link to="/user/600aaece1bc232d9be36bf73" className="link flex a-center"><div className="profile-img eran"></div><h3>Eran Harel</h3></Link>
                    <Link to="/user/600ab0631bc232d9be36bf74" className="link flex a-center"><div className="profile-img ohad"></div><h3>Ohad Avitan</h3></Link>
                    <Link to="/user/6005e2fbd41f3e9140756031" className="link flex a-center"><div className="profile-img tom"></div><h3>Tom Lebeodkin</h3></Link>
                </div>
            </section>
        </div>
    </footer>
}