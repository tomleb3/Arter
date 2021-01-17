import { Component } from 'react'
import { connect } from 'react-redux'
import { userService } from '../services/userService.js'
import { ItemPreview } from '../cmps/ItemPreview.jsx'
import { ReviewList } from '../cmps/ReviewList.jsx'
import { AppFilter } from '../cmps/AppFilter.jsx'
import { addReview } from '../store/actions/userActions.js'
import { ItemList } from '../cmps/ItemList.jsx'

class _UserDetails extends Component {

    state = {
        user: null,
        items: []
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        this.loadUser()
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) this.loadUser()
    }

    onAddReview = (txt, rating) => {
        console.log(txt, rating)
        const review = {
            txt,
            rating,
            createdAt: Date.now()
        }
        const {user} = this.state
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

        if (!user) return <div className="loader"></div>
        return (
            <section className="main-layout m-page">
                <div className="profile-header">
                    <img className="banner-img" src={user.imgUrls.banner} alt="" />
                    <img className="profile-img" src={user.imgUrls.profile} alt={user.fullname} />
                </div>
                <div className="content flex">
                    <div className="sidebar">
                        <AppFilter />
                        <button className="custom-order-btn">Custom Order</button>
                        <button className="custom-order-btn">Contact Me</button>
                    </div>
                    <div className="main">
                        <div className="about">
                            <h1>{user.fullname}</h1>
                            <br />
                            <p>{user.description}</p>
                        </div>

                        <h3 className="portfolio">Portfolio</h3>
                        <ItemList items={items} />
                        <div className="review-container">
                            <ReviewList reviews={user.reviews} onAdd={this.onAddReview} />
                        </div>
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
        items: state.itemModule.items,
    }
}

const mapDispatchToProps = {
    addReview
}

export const UserDetails = connect(mapStateToProps, mapDispatchToProps)(_UserDetails)
