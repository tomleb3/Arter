import { Component } from 'react'
import { userService } from '../services/userService.js'

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

        const items = await userService.getItems(id)
        console.log('items', items);
        this.setState({ items })
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
                <img src="" alt="" />
                <div className="sidebar">
                    <button>something1</button>
                    <button>something2</button>
                </div>
                <div className="main">
                    <div>
                        <div className="about">
                            <h1>User Details</h1>
                            <h3>{user.fullname}</h3>
                        </div>
                        <div className="item-list">
                            {items.map((item) => <h3 key={item._id}>{item.title}</h3>)}
                        </div>
                    </div>
                </div>

            </section>

        )
    }
}
