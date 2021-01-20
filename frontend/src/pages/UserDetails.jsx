import { Component } from 'react'
import { connect } from 'react-redux'
import { userService } from '../services/userService.js'
import { utilService } from '../services/utilService.js'
import { ReviewList } from '../cmps/ReviewList.jsx'
import { AppFilter } from '../cmps/AppFilter.jsx'
import { addReview } from '../store/actions/userActions.js'
import { loadItems } from '../store/actions/itemActions.js'
import { ItemList } from '../cmps/ItemList.jsx'
import { ReviewAdd } from '../cmps/ReviewAdd.jsx'
import { Rating } from '@material-ui/lab'
import { Link } from 'react-router-dom'

class _UserDetails extends Component {

    state = {
        user: null,
        items: []
    }

    async componentDidMount() {
        this.loadUser()
        window.scrollTo(0, 0)
    }

    async componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.loadUser()
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

        const { items } = this.props
        const userItems = items.filter(item => id === item.seller._id)
        this.setState({ items: userItems })
    }


    render() {
        const { user, items } = this.state
        const { users } = this.props
        const userRating = utilService.calcRate(user) || 0

        if (!user) return <div className="loader-container"><div className="loader m-page"></div></div>
        return (
            <section className="main-layout m-page">
                <div className="profile-header">
                    <img className="banner-img" src={user.imgUrls.banner} alt="" />
                    <img className="profile-img" src={user.imgUrls.profile} alt={user.fullname} />
                </div>
                <div className="content flex">
                    <div className="sidebar">
                        {/* <AppFilter /> */}
                        <Link to="/user-details"><button className="custom-order-btn">Edit profile</button></Link>
                        <button className="custom-order-btn">Custom Order</button>
                        <button className="custom-order-btn">Contact Me</button>
                        <button>Sold Items</button>
                        <ul>SOLD</ul>
                        <ul>PENDING

                        </ul>
                        <button>Purchased Items</button>
                        <ul>PURCHASED</ul>
                        <ul>PENDING</ul>
                    </div>
                    <div className="main">
                        <div className="about">
                            <h1>{user.fullname}</h1>
                            <br />
                            <p>{user.description}</p>
                        </div>

                        <h3 className="portfolio">Portfolio</h3>
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
        // loggedInUser: state.userModule.loggedInUser
        users: state.userModule.users,
        items: state.itemModule.items
    }
}
const mapDispatchToProps = {
    loadItems,
    addReview
}
export const UserDetails = connect(mapStateToProps, mapDispatchToProps)(_UserDetails)