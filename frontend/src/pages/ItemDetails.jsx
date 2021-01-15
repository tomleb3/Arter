import { Component } from 'react'
import { itemService } from '../services/itemService.js'
import { Link } from 'react-router-dom'

export class ItemDetails extends Component {

    state = {
        item: null
    }

    async componentDidMount() {
        const { id } = this.props.match.params
        const item = await itemService.getById(id)
        this.setState({ item })
    }

    render() {
        const { item } = this.state
        if (!item) return <div className="loader"></div>
        return (
            // <ItemUpdate/>
            <section className="item-page flex col j-evenly m-page">
                <div className="item-details flex j-evenly">
                    <div className="item-show flex col">
                        <h1 className="item-name">{item.title}</h1>
<<<<<<< HEAD

                        <div class="frame">
                            <div class="mat">
                                <div class="art">
                                    <img className="item-img" src={item.imgUrl} alt={item.title} />
                                </div>
                            </div>
                        </div>

=======
                        <img className="item-img" src={item.imgUrl} alt={item.title} />
                        <Link to={`/user/${item.seller._id}`}><img className="profile-img" src={item.seller.imgUrl} alt={item.seller.fullname} /></Link>
>>>>>>> 6f8cc639523d45de4eb7d25574de0295aaaf39e0
                    </div>
                    <div className="item-desc flex col j-between">
                        <h2>About this piece:</h2>
                        <p>{item.description}</p>
                        <p>Price: ${item.price}</p>
                        {/* <p>{item.tags}</p> */}
                        <button className="purchase-btn">Purchase</button>
                    </div>
                </div>
                <div>
                </div>
                <div className="other-works flex j-evenly">
                    <div>other item link</div>
                    <div>other item link</div>
                    <div>other item link</div>
                </div>
            </section>
        )
    }
}
