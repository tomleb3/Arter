import { Link } from 'react-router-dom'

export function AppHeader({ }) {

    return (
        <header>
            <section className="main-layout flex j-between a-center">
                <div className="logo"><Link exact to="/">Arter</Link></div>
                <nav className="flex">
                    <Link to="/explore"><h3>Explore</h3></Link>
                    <Link to="/login"><h3>Login</h3></Link>
                </nav>
            </section>
        </header>
    )
}