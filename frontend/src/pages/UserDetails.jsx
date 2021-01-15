import { Component } from 'react'
import { userService } from '../services/userService.js'
import { itemService } from '../services/itemService.js'
import { ItemPreview } from '../cmps/ItemPreview.jsx'
import { ReviewList } from '../cmps/ReviewList.jsx'
import { AppFilter } from '../cmps/AppFilter.jsx'

export class UserDetails extends Component {

    state = {
        user: null,
        items: []
    }

    componentDidMount() {
        this.loadUser()
    }

    componentDidUpdate(prevProps) {
        if(this.props.match.params.id !== prevProps.match.params.id){
            this.loadUser()
        }
    }


    loadUser = async () => {
        const { id } = this.props.match.params
        const user = await userService.getById(id)
        this.setState({ user })

        const items = await itemService.query()
        const userItems = items.filter((item) => id === item.seller._id)
        this.setState({ items: userItems })
    }


    render() {
        const { user } = this.state
        const { items } = this.state

        if (!user) return <div className="loader"></div>
        return (
            <section className="main-layout m-page">
                <div className="profile-header">
                    <img className="banner-img" src={user.imgUrls.banner} alt="" />
                    <img className="profile1-img" src={user.imgUrls.profile} alt={user.fullname} />
                </div>
                <div className="content flex ">
                    <div className="sidebar">
                        <AppFilter/>
                        <button className="custom-order-btn">Custom Order</button>
                    </div>
                    <div className="main">
                        <div className="about">
                            <h1>{user.fullname}</h1>
                            <p>{user.description}</p>
                        </div>
                        
                        <div className="item-list flex">
                            {items.map((item) => <ItemPreview key={item._id} item={item} />)}

                            {/* {items.map((item) => <h3 key={item._id}>{item.title}</h3>)} */}
                            {/* {if(items.length===0) return <button>Go Explore</button>
                            else return <div>{items.map((item) => <ItemPreview item={item} />)}</div>} */}

                        </div>
                        <div className="review-container">
                            {/* {user.reviews.map(review => <ReviewList reviews={user.reviews}/>)} */}
                            <ReviewList reviews={user.reviews} />
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
