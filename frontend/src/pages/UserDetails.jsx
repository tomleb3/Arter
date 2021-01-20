import { Component } from 'react'
import { connect } from 'react-redux'
import { userService } from '../services/userService.js'
import { utilService } from '../services/utilService.js'
import { ReviewList } from '../cmps/ReviewList.jsx'
import { loadOrders } from '../store/actions/orderActions.js'
// import { AppFilter } from '../cmps/AppFilter.jsx'
import { addReview } from '../store/actions/userActions.js'
import { ItemList } from '../cmps/ItemList.jsx'
import { ReviewAdd } from '../cmps/ReviewAdd.jsx'
import { Rating } from '@material-ui/lab'
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

    onAddReview = (txt, rating) => {
        console.log(txt, rating)
        const review = {
            txt,
            rating,
            createdAt: Date.now()
        }
        const { user } = this.state
        user.reviews.unshift(review)
        this.props.addReview(review)
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
        console.log(this.props.orders) // NO GET ORDERS...WHAT DO
        this.setState({ items: itemsForDisplay })
    }

    render() {
        const { user, items } = this.state
        const { users, loggedInUser } = this.props
        const userRating = utilService.calcRate(user) || 0

        if (!user) return <div className="loader-container"><div className="loader m-page"></div></div>
        return (
            <section className="main-layout m-page">
                <div className="profile-header">
                    <img className="banner-img" src={user.imgUrls.banner} alt=""
                        onClick={() => loggedInUser && loggedInUser._id === user._id && console.log('THIS IS MY BANNER')} />
                    <img className="profile-img" src={user.imgUrls.profile} alt={user.fullname}
                        onClick={() => loggedInUser && loggedInUser._id === user._id && console.log('THIS IS MY PROFILE')} />
                </div>
                <div className="content flex">
                    <div className="sidebar">
                        {/* <AppFilter /> */}
                        <button className="custom-order-btn">Custom Order</button>
                        <button className="custom-order-btn">Contact Me</button>
                    </div>
                    <div className="main">
                        <div className="about">
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
                        <ItemList items={items} users={users} />
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
        users: state.userModule.users,
        items: state.itemModule.items,
        orders: state.orderModule.orders
    }
}
const mapDispatchToProps = {
    addReview,
    loadOrders
}
export const UserDetails = connect(mapStateToProps, mapDispatchToProps)(_UserDetails)