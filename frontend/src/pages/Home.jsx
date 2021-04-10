import { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { UserList } from '../cmps/UserList.jsx'
import { Button } from '@material-ui/core'
import { ItemPreview } from '../cmps/ItemPreview.jsx'
import { utilService } from '../services/utilService.js'


class _Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            windowSize: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            items: JSON.parse(JSON.stringify(this.props.items)),
            randomItems: [],
            latestItems: []
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }

    componentDidMount() {
        const { items } = this.state
        window.scrollTo(0, 0)
        window.addEventListener('resize', this.updateWindowDimensions)
        this.updateWindowDimensions()
        this.setState({
            ...this.state,
            randomItems: this.getRandomItems(items),
            latestItems: this.getLatestItems(items)
        })
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions)
    }

    updateWindowDimensions() {
        this.setState({
            ...this.state,
            windowSize: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        })
    }

    getRandomItems = items => {
        return items.reduce((accRandItems, item, idx) => {
            item = items[utilService.getRandomInt(0, items.length)]
            if (!accRandItems.includes(item) && !item.purchasedAt && accRandItems.length <= 3) accRandItems.push(item)
            return accRandItems
        }, [])
    }

    getLatestItems = items => {
        const sortedItems = items.sort((a, b) => b.createdAt - a.createdAt)
        return sortedItems.filter((item, idx) => { return idx <= 3 ? item : null })
    }

    render() {
        const { users, loggedInUser } = this.props
        const { items, randomItems, latestItems, windowSize } = this.state

        return <section className="home m-page">
            <div className="hero">
                <div className="hero-content main-layout flex j-center a-center">
                    <h2>Find New Creations</h2>
                    <h2>Get To Know The Artists</h2>
                    <div className="btn-cta"><Link to="/explore" className="link"><Button variant="outlined" style={{ color: 'white', borderColor: 'white' }}>Discover</Button></Link></div>
                </div>
            </div>

            <main>
                <article className="main-layout">
                    <label>Hot Categories</label>
                    <section className="categories flex wrap j-between txt-center">
                        <div className="flex col">
                            <Link to={{ pathname: "/explore", filterBy: "Glass" }}>
                                <div className="flex a-center j-center"
                                    style={{ backgroundImage: `url(https://res.cloudinary.com/arter/image/upload/v1611425886/Home%20topics/tiqlnoshz1qkpmjec3yi.jpg)` }}>
                                    {windowSize.width < 1300 && <h5>Glasswork</h5>}
                                </div>
                                {windowSize.width > 1300 && <h5>Glasswork</h5>}
                            </Link>
                        </div>
                        <div className="flex col">
                            <Link to={{ pathname: "/explore", filterBy: "Wood" }}>
                                <div className="flex a-center j-center"
                                    style={{ backgroundImage: `url(https://res.cloudinary.com/arter/image/upload/v1611431953/Home%20topics/kpdnlxgr5sczqeo9sfom.jpg)` }}>
                                    {windowSize.width < 1300 && <h5>Woodwork</h5>}
                                </div>
                                {windowSize.width > 1300 && <h5>Woodwork</h5>}
                            </Link>
                        </div>
                        <div className="flex col">
                            <Link to={{ pathname: "/explore", filterBy: "Painting" }}>
                                <div className="flex a-center j-center"
                                    style={{ backgroundImage: `url(https://res.cloudinary.com/arter/image/upload/v1610825845/Home%20topics/painting1_fvloac.jpg)` }}>
                                    {windowSize.width < 1300 && <h5>Paintings</h5>}
                                </div>
                                {windowSize.width > 1300 && <h5>Paintings</h5>}
                            </Link>
                        </div>
                        <div className="flex col">
                            <Link to={{ pathname: "/explore", filterBy: "Jewelry" }}>
                                <div className="flex a-center j-center"
                                    style={{ backgroundImage: `url(https://res.cloudinary.com/arter/image/upload/v1610825888/Home%20topics/jewlery_ifguvi.jpg)` }}>
                                    {windowSize.width < 1300 && <h5>Jewelry</h5>}
                                </div>
                                {windowSize.width > 1300 && <h5>Jewelry</h5>}
                            </Link>
                        </div>
                        <div className="flex col">
                            <Link to={{ pathname: "/explore", filterBy: "Crafts" }}>
                                <div className="flex a-center j-center"
                                    style={{ backgroundImage: `url(https://res.cloudinary.com/arter/image/upload/v1610826083/Home%20topics/origami-crafts_yx7ejc.jpg)` }}>
                                    {windowSize.width < 1300 && <h5>Crafts</h5>}
                                </div>
                                {windowSize.width > 1300 && <h5>Crafts</h5>}
                            </Link>
                        </div>
                    </section>
                </article>
                <article className="main-layout">
                    <div className="flex j-between a-center">
                        <label>Latest Works</label>
                        <Link to={{ pathname: "/explore", sortBy: "date" }} className="see-more">See More...</Link>
                    </div>
                    <div className="latest-works flex j-between wrap">
                        {latestItems.map(item => {
                            return <ItemPreview key={item._id} item={item} minified withProfile />
                        })}
                    </div>
                </article>
                <article className="our-services">
                    <article className="our-services-container main-layout flex j-center a-center">
                        <h2>Join The Family</h2>
                        <h2>Share Your Arts</h2>
                        <div className="btn-cta"><Link to={loggedInUser ? '/item/edit' : '/login'}><Button variant="outlined" style={{ backgroundColor: '#13acca', color: 'white' }}>Publish Now</Button></Link></div>
                    </article>
                </article>
                <article className="main-layout">
                    <div className="flex j-between a-center">
                        <label>Our Experts Choices</label>
                        <Link to="/explore" className="see-more">See More...</Link>
                    </div>
                    <div className="featured-creations flex j-between wrap">
                        {randomItems.map(item => {
                            return <ItemPreview key={item._id} item={item} minified withProfile />
                        })}
                    </div>
                </article>
                <article className="main-layout">
                    <label>Top Artists</label>
                    <UserList users={users} items={items} tallMode />
                </article>
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