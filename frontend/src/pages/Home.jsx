import { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { GetStarted } from '../cmps/GetStarted.jsx'
import { UserList } from '../cmps/UserList.jsx'
import { Button } from '@material-ui/core'

class _Home extends Component {

    componentDidMount() { window.scrollTo(0, 0) }

    render() {
        const { users, items, loggedInUser } = this.props

        return <section className="home m-page">
            <div className="hero-container flex j-center a-center">
                <h2>Join The Family,</h2>
                <h2>Share Your Arts</h2>
                <div className="btn"><Button variant="outlined" style={{ color: 'white', borderColor: 'white' }}><Link to={loggedInUser ? '/item/edit' : '/login'}>Publish Now</Link></Button></div>
            </div>

            <main>
                <article className="main-layout">
                    <h3>Hot Categories</h3>
                    <section className="categories flex j-between txt-center">
                        <div className="flex col">
                            <Link to={{ pathname: "/explore", type: "Glass" }}>
                                <div className="flex a-center j-center"
                                    style={{ backgroundImage: `url(https://res.cloudinary.com/arter/image/upload/v1610826046/Home%20topics/pexels-pixabay-220990_b1c6hg.jpg)` }}></div>
                            </Link>
                            <h5>Glasswork</h5>
                        </div>
                        <div className="flex col">
                            <Link to={{ pathname: "/explore", type: "Wood" }}>
                                <div className="flex a-center j-center"
                                    style={{ backgroundImage: `url(https://res.cloudinary.com/arter/image/upload/v1610901953/Home%20topics/woodwork2_dikhpk.jpg)` }}></div>
                            </Link>
                            <h5>Woodwork</h5>
                        </div>
                        <div className="flex col">
                            <Link to={{ pathname: "/explore", type: "Painting" }}>
                                <div className="flex a-center j-center"
                                    style={{ backgroundImage: `url(https://res.cloudinary.com/arter/image/upload/v1610825845/Home%20topics/painting1_fvloac.jpg)` }}></div>
                            </Link>
                            <h5>Paintings</h5>
                        </div>
                        <div className="flex col">
                            <Link to={{ pathname: "/explore", type: "Jewelry" }}>
                                <div className="flex a-center j-center"
                                    style={{ backgroundImage: `url(https://res.cloudinary.com/arter/image/upload/v1610825888/Home%20topics/jewlery_ifguvi.jpg)` }}></div>
                            </Link>
                            <h5>Jewelry</h5>
                        </div>
                        <div className="flex col">
                            <Link to={{ pathname: "/explore", type: "Crafts" }}>
                                <div className="flex a-center j-center"
                                    style={{ backgroundImage: `url(https://res.cloudinary.com/arter/image/upload/v1610826083/Home%20topics/origami-crafts_yx7ejc.jpg)` }}></div>
                            </Link>
                            <h5>Crafts</h5>
                        </div>
                    </section>
                </article>
                <article className="our-services">
                    <h2>Find New Creations,</h2>
                    <h2>Get To Know The Artists</h2>
                    <div className="btn"><Link to="/explore" className="link"><Button variant="outlined" style={{ backgroundColor: '#13acca', color: 'white' }}>Discover</Button></Link></div>
                </article>
                <article className="main-layout">
                    <h3>Featured Artists</h3>
                    <UserList users={users} items={items} />
                </article>
                {/* <GetStarted /> */}
            </main>
        </section>
    }
}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.userModule.loggedInUser,
        users: state.userModule.users,
        items: state.itemModule.items
    }
}

export const Home = connect(mapStateToProps)(_Home)