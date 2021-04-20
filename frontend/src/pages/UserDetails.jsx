import { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { userService } from '../services/userService.js'
import { utilService } from '../services/utilService.js'
import { ReviewList } from '../cmps/ReviewList.jsx'
import { loadOrders } from '../store/actions/orderActions.js'
import { editUser } from '../store/actions/userActions.js'
import { ItemList } from '../cmps/ItemList.jsx'
import { ReviewAdd } from '../cmps/ReviewAdd.jsx'
import { Rating } from '@material-ui/lab'
import { Link } from 'react-router-dom'
import { Button, ButtonGroup } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

class _UserDetails extends Component {

    state = {
        user: null,
        items: [],
        itemFilter: ''
    }

    componentDidMount() {
        this.props.loadOrders()
        this.loadUser()
        this.getItemsForDisplay()
        window.scrollTo(0, 0)
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            window.location.reload()
            this.props.loadOrders()
            this.loadUser()
            this.getItemsForDisplay()
            window.scrollTo(0, 0)
        }
    }

    onAddReview = (txt, rate) => {
        const { loggedInUser } = this.props
        let { user } = this.state
        let { reviews } = user
        const review = {
            id: utilService.makeId(),
            createdAt: Date.now(),
            txt,
            rate,
            byUser: {
                _id: loggedInUser._id,
                fullname: loggedInUser.fullname,
                imgUrl: loggedInUser.imgUrls.profile
            }
        }
        reviews.unshift(review)
        user = { ...user, reviews }
        this.props.editUser(user)
    }

    loadUser = async () => {
        const { id } = this.props.match.params
        const user = await userService.getById(id)
        this.setState({ user })
    }

    getItemsForDisplay = async filterBy => {
        const { id } = this.props.match.params
        const { items } = this.props //
        let itemsForDisplay
        switch (filterBy) {
            case 'sold':
                itemsForDisplay = items.filter(item => id === item.seller._id && item.purchasedAt)
                break
            case 'forSale':
                itemsForDisplay = items.filter(item => id === item.seller._id && !item.purchasedAt)
                break
            default:
                itemsForDisplay = items.filter(item => id === item.seller._id)
        }
        this.setState({
            ...this.state,
            items: itemsForDisplay,
            itemFilter: filterBy
        })
    }

    getSoldItems = () => {
        const { user } = this.state
        const { orders } = this.props
        if (!orders.length || !user) return
        return orders.filter(order => {
            return (order.seller._id === user._id) ? order : null
        })
    }

    getBoughtItems = () => {
        const { user } = this.state
        const { orders } = this.props
        if (!orders.length || !user) return
        return orders.filter(order => {
            return (order.buyer._id === user._id) ? order : null
        })
    }

    getTotalMoneyEarned() {
        const soldItems = this.getSoldItems()
        let sum = 0
        if (soldItems) soldItems.map(item => sum += item.item.price)
        return sum
    }

    sidenavContent(status) {
        const { user } = this.state
        const { loggedInUser } = this.props
        const soldItems = this.getSoldItems()
        const boughtItems = this.getBoughtItems()

        return <aside className={status === 'normal' ? "sidebar" : "sidebar mobile"}>
            {loggedInUser && loggedInUser._id === user._id && <Link to={`/user/edit/${user._id}`}><button>Edit Profile</button></Link>}
            {loggedInUser && loggedInUser._id === user._id && <button>Notifications</button>}
            {status === 'normal' && <Fragment>
                <button>Custom Order</button>
                <button>Contact Me</button>
            </Fragment>}
            <button>Favourites</button>
            {loggedInUser && loggedInUser._id === user._id &&
                <Fragment>
                    <ul><h4>Items Bought</h4>
                        {boughtItems.length ?
                            boughtItems.map(order => {
                                return <li key={order._id}><a href={`#/item/${order.item._id}`}>{order.item.title}</a>,
                  bought from <a href={`#/user/${order.seller._id}`}>{order.seller.fullname}</a>
                                    <p className="muted">Shipping Status: {order.shippingStatus}</p>
                                </li>
                            })
                            : <p className="muted">Nothing bought yet...</p>}
                    </ul>
                    <div className="border-bottom"></div>
                    <ul><h4>Items Sold</h4>
                        {soldItems.length ?
                            soldItems.map(order => {
                                return <li key={order._id}><a href={`#/item/${order.item._id}`}>{order.item.title}</a>,
                  bought by <a href={`#/user/${order.buyer._id}`}>{order.buyer.fullname}</a>
                                    <p className="muted">Shipping Status: {order.shippingStatus}</p>
                                </li>
                            })
                            : <p className="muted">Nothing sold yet...</p>}
                    </ul>
                    <div className="border-bottom"></div>
                    <p>Total earnings: ${this.getTotalMoneyEarned()}</p>
                </Fragment>}
        </aside >
    }

    render() {
        const { user, items, itemFilter } = this.state
        const userRating = utilService.calcRate(user) || 0

        if (!user) return <div></div>
        return (
            <section className="user-details main-layout m-page">
                <div className="profile-header">
                    <img className="banner-img" src={user.imgUrls.banner ||
                        'https://www.solidbackgrounds.com/images/950x350/950x350-light-gray-solid-color-background.jpg'} alt="" />
                    <img className="profile-img" src={user.imgUrls.profile} alt={user.fullname} alt="" />
                </div>
                <div className="content flex">
                    {this.sidenavContent('normal')}
                    <div className="main">
                        <div className="about-user">
                            <div className="flex j-between a-baseline">
                                <h1>{user.fullname}</h1>
                                <div className="mobile-sidebar">
                                    <label htmlFor="mobile-sidebar-checkbox"><MenuIcon className="pointer" /></label>
                                    <input type="checkbox" id="mobile-sidebar-checkbox" className="d-none" />
                                    <nav className="d-none">{this.sidenavContent('mobile')}</nav>
                                </div>
                            </div>
                            <div className="contact-btns-mobile flex">
                                <p className="site-clr3">Custom Order</p>
                                <p className="site-clr1">Contact Me</p>
                            </div>
                            <br />
                            <p className="desc-txt">{user.description}</p>
                        </div>

                        <div className="portfolio-container flex a-center j-between">
                            <h3>Portfolio</h3>
                            <ButtonGroup variant="text" size="small">
                                <Button onClick={() => this.getItemsForDisplay('')}>
                                    <span className={`btn-group ${!itemFilter && 'active'}`}>All</span>
                                </Button>
                                <Button onClick={() => this.getItemsForDisplay('sold')}>
                                    <span className={`btn-group ${itemFilter === 'sold' && 'active'}`}>Sold</span>
                                </Button>
                                <Button onClick={() => this.getItemsForDisplay('forSale')}>
                                    <span className={`btn-group ${itemFilter === 'forSale' && 'active'}`}>For Sale</span>
                                </Button>
                            </ButtonGroup>
                        </div>
                        <ItemList items={items} />
                        <div className="review-container flex a-center j-between">
                            <div className="flex">
                                <h3>Reviews</h3>
                                <Rating name="rating" value={userRating} readOnly />
                                <p className="muted font-mont rate-num">({user.reviews.length})</p>
                            </div>
                            {<ReviewAdd onAdd={this.onAddReview} currUser={user} />}
                        </div>
                        <ReviewList reviews={user.reviews} />
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser,
        items: state.itemModule.items,
        orders: state.orderModule.orders
    }
}
const mapDispatchToProps = {
    editUser,
    loadOrders
}
export const UserDetails = connect(mapStateToProps, mapDispatchToProps)(_UserDetails)