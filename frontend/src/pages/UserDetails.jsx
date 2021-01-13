import { Component } from 'react'
import { userService } from '../services/userService.js'
import { itemService } from '../services/itemService.js'
import { ItemPreview } from '../cmps/ItemPreview.jsx'

export class UserDetails extends Component {

    state = {
        user: null,
        items: []
    }

    async componentDidMount() {
        const { id } = this.props.match.params
        const user = await userService.getById(id)
        console.log('user: ', user);
        this.setState({ user })

        const items = await itemService.query()
        const userItems = items.filter((item) => id === item.seller._id)
        console.log('userItems', userItems);
        this.setState({ items: userItems })
    }


    render() {
        const { user } = this.state
        const { items } = this.state
        if (!user) return <div className="loader"></div>
        return (
            <section>
                {/* BANNER */}
                <img src="" alt="" />
                {/* PROFILE */}
                <img className="profile-img" src={`${user.imgUrl}`} alt="" />
                <div className="sidebar">
                    <button>something1</button>
                    <button>something2</button>
                </div>
                <div className="main">
                    <div>
                        <div className="about">
                            <h1>{user.fullname}</h1>
                        </div>
                        <div className="item-list flex">
                            {items.map((item) => <ItemPreview item={item} />)}

                            {/* {items.map((item) => <h3 key={item._id}>{item.title}</h3>)} */}
                            {/* {if(items.length===0) return <button>Go Explore</button>
                            else return <div>{items.map((item) => <ItemPreview item={item} />)}</div>} */}

                        </div>
                        <div>
                            {/* {user.reviews.map((review) => (<ReviewList reviews={user.reviews}/>))} */}

                        </div>
                    </div>
                </div>

            </section>

        )
    }
}
