import { Link } from 'react-router-dom'

export function AppHeader({ }) {

    return (
        <header>
            <section className="main-layout flex j-between a-center">
                <div className="logo"><Link to="/">Arter</Link></div>
                <nav className="flex">
                    <Link to="/explore"><p>Explore</p></Link>
                    <Link to="/login"><p>Login</p></Link>
                </nav>
            </section>
        </header>
    )
}