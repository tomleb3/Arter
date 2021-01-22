import { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
// import { GetStarted } from '../cmps/GetStarted.jsx'
import { UserList } from '../cmps/UserList.jsx'
import { Button } from '@material-ui/core'
import { ItemPreview } from '../cmps/ItemPreview.jsx'
import { utilService } from '../services/utilService.js'

class _Home extends Component {

    componentDidMount() { window.scrollTo(0, 0) }

    getRandomItems = items => {
        return items.reduce((accRandItems, item, idx) => {
            item = items[utilService.getRandomInt(0, items.length)]
            if (!accRandItems.includes(item) && !item.purchasedAt && accRandItems.length <= 3) accRandItems.push(item)
            return accRandItems
        }, [])
    }

    getLatestItems = items => {
        const sortedItems = items.sort((a, b) => b.createdAt - a.createdAt)
        return sortedItems.filter((item, idx) => { if (idx <= 3) return item })
    }

    render() {
        const { users, items, loggedInUser } = this.props
        const randomItems = this.getRandomItems(items)
        const latestItems = this.getLatestItems(items)

        return <section className="home m-page">
            <div className="hero flex j-center a-center">
                <div className="main-layout">
                    <h2>Find New Creations,</h2>
                    <h2>Get To Know The Artists</h2>
                    <div className="btn-cta"><Link to="/explore" className="link"><Button variant="outlined" style={{ color: 'white', borderColor: 'white' }}>Discover</Button></Link></div>
                </div>
            </div>

            <main>
                <article className="main-layout">
                    <label>Hot Categories</label>
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
                <article className="main-layout">
                    <div className="flex j-between a-center">
                        <label>Latest Works</label>
                        <Link to="/explore" className="see-more">See More...</Link>
                    </div>
                    <div className="flex j-between">
                        {latestItems.map(item => {
                            return <ItemPreview key={item._id} item={item} minified />
                        })}
                    </div>
                </article>
                <article className="our-services">
                    <h2>Join The Family,</h2>
                    <h2>Share Your Arts</h2>
                    <div className="btn-cta"><Link to={loggedInUser ? '/item/edit' : '/login'}><Button variant="outlined" style={{ backgroundColor: '#13acca', color: 'white' }}>Publish Now</Button></Link></div>
                </article>
                <article className="main-layout">
                    <div className="flex j-between a-center">
                        <label>Featured Creations</label>
                        <Link to="/explore" className="see-more">See More...</Link>
                    </div>
                    <div className="flex j-between">
                        {randomItems.map(item => {
                            return <ItemPreview key={item._id} item={item} minified />
                        })}
                    </div>
                </article>
                <article className="main-layout">
                    <label>Top Artists</label>
                    <UserList users={users} items={items} tallMode />
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