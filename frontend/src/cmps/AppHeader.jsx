import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

function _AppHeader({ loggedInUser }) {

    return (
        <header>
            <section className="main-layout flex j-between a-center">
                <div className="logo"><Link to="/">Arter</Link></div>
                <nav className="flex">
                    {/* <Link to="/explore"><ExploreIcon /></Link> */}
                    <Link to="/explore"><h3>Explore</h3></Link>
                    <Link to="/explore"><h3>Publish</h3></Link>
                    {loggedInUser ?
                        <Link to="/login"><img src={loggedInUser.imgUrls.profile} /></Link> :
                        <Link to="/login"><h3>Login</h3></Link>}
                    {/* <Link to="/login"><h3>Login</h3></Link> */}
                </nav>
            </section>
        </header>
    )
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser,
    }
}
export const AppHeader = connect(mapStateToProps)(_AppHeader)