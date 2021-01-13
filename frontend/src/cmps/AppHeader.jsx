import { NavLink } from 'react-router-dom'

export function AppHeader({ }) {

    return (
        <header>
            <section className="main-layout flex j-between a-center">
                <div className="logo"><NavLink exact to="/">Arter</NavLink></div>
                <nav className="flex">
                    <NavLink to="/explore"><p>Explore</p></NavLink>
                    <NavLink to="/"><p>Signup</p></NavLink>
                </nav>
            </section>
        </header>
    )
}