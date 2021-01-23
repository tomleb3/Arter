import { Component } from 'react'
import { connect } from 'react-redux'
import { userService } from '../services/userService.js'
import { utilService } from '../services/utilService.js'
import { ReviewList } from '../cmps/ReviewList.jsx'
import { loadOrders } from '../store/actions/orderActions.js'
// import { AppFilter } from '../cmps/AppFilter.jsx'
import { editUser } from '../store/actions/userActions.js'
import { ItemList } from '../cmps/ItemList.jsx'
import { ReviewAdd } from '../cmps/ReviewAdd.jsx'
import { Rating } from '@material-ui/lab'
import { Link } from 'react-router-dom'
import { Button, ButtonGroup } from '@material-ui/core'

class _UserDetails extends Component {

    state = {
        user: null,
        items: []
    }

    async componentDidMount() {
        this.loadUser()
        this.getItemsForDisplay()
        window.scrollTo(0, 0)
    }

    async componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
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

    getItemsForDisplay = async (sorter = 'all') => {
        const { id } = this.props.match.params
        const { items } = this.props
        let itemsForDisplay
        switch (sorter) {
            case 'all':
                itemsForDisplay = items.filter(item => id === item.seller._id)
                break
            case 'sold':
                itemsForDisplay = items.filter(item => id === item.seller._id && item.purchasedAt)
                break
            case 'forSale':
                itemsForDisplay = items.filter(item => id === item.seller._id && !item.purchasedAt)
                break
            // case 'purchased':
            // const itemsForDisplay = items.filter(item =>
        }
        this.setState({ items: itemsForDisplay })
    }

    getSoldItems = () => {
        const { user } = this.state
        const { orders } = this.props
        if (!orders.length || !user) return
        return orders.filter(order => {
            if (order.seller._id === user._id) return order
        })
    }

    getBoughtItems = () => {
        const { user } = this.state
        const { orders } = this.props
        if (!orders.length || !user) return
        return orders.filter(order => {
            if (order.buyer._id === user._id) return order
        })
    }

    getTotalMoneyEarned() {
        const soldItems = this.getSoldItems()
        console.log(soldItems)
        let sum = 0
        if (soldItems) soldItems.map(item => sum += item.item.price)
        return sum
    }

    render() {
        const { user, items } = this.state
        const { orders, loggedInUser } = this.props
        const soldItems = this.getSoldItems()
        const boughtItems = this.getBoughtItems()
        const userRating = utilService.calcRate(user) || 0

        if (!user) return <div className="loader-container"><div className="loader m-page"></div></div>
        return (
            <section className="user-details main-layout m-page">
                <div className="profile-header">
                    <img className="banner-img" src={user.imgUrls.banner} alt=""
                        onClick={() => loggedInUser && loggedInUser._id === user._id && console.log('THIS IS MY BANNER')} />
                    <img className="profile-img" src={user.imgUrls.profile} alt={user.fullname}
                        onClick={() => loggedInUser && loggedInUser._id === user._id && console.log('THIS IS MY PROFILE')} />
                </div>
                <div className="content flex">
                    <aside className="sidebar">
                        {/* <AppFilter /> */}
                        <Link to={`/user/edit/${user._id}`}><button className="custom-order-btn">Edit Profile</button></Link>
                        <button className="custom-order-btn">Custom Order</button>
                        <button className="custom-order-btn">Contact Me</button>
                        <ul><h4>Items Sold</h4>
                            {soldItems.length ?
                                soldItems.map(order => {
                                    return <li key={order._id}><a href={`#/item/${order.item._id}`}>{order.item.title}</a>,
                                    bought by <a href={`#/user/${order.buyer._id}`}>{order.buyer.fullname}</a></li>
                                })
                                : <p className="muted">Nothing sold yet...</p>}
                        </ul>
                        <div className="border-bottom"></div>
                        <ul><h4>Items Bought</h4>
                            {boughtItems.length ?
                                boughtItems.map(order => {
                                    return <li key={order._id}><a href={`#/item/${order.item._id}`}>{order.item.title}</a>,
                                    bought from <a href={`#/user/${order.seller._id}`}>{order.seller.fullname}</a></li>
                                })
                                : <p className="muted">Nothing bought yet...</p>}
                        </ul>
                        <div className="border-bottom"></div>
                        <p>Total earnings: ${this.getTotalMoneyEarned()}</p>
                    </aside>
                    <div className="main">
                        <div className="about-user">
                            <h1>{user.fullname}</h1>
                            <br />
                            <p>{user.description}</p>
                        </div>

                        <div className="portfolio-container flex a-center j-between">
                            <h3>Portfolio</h3>
                            <ButtonGroup variant="text" size="small">
                                <Button onClick={() => this.getItemsForDisplay('all')}>All</Button>
                                <Button onClick={() => this.getItemsForDisplay('sold')}>Sold</Button>
                                <Button onClick={() => this.getItemsForDisplay('forSale')}>For Sale</Button>
                            </ButtonGroup>
                        </div>
                        <ItemList items={items} />
                        <div className="review-container flex a-center j-between">
                            <div className="flex">
                                <h3>Reviews</h3>
                                <Rating name="rating" value={userRating} readOnly />
                                <p className="muted">({user.reviews.length})</p>
                            </div>
                            <ReviewAdd onAdd={this.onAddReview} />
                        </div>
                        <ReviewList reviews={user.reviews} />
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
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