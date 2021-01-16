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
            <section className="item-page flex col j-evenly m-page">  
            <Link to={`/item/edit/${item._id}`}>Edit Item</Link>
                <div className="item-details flex j-evenly">
                    <div className="item-show flex col">
                        <h1 className="item-name">{item.title}</h1>
                        <img className="item-img" src={item.imgUrl} alt={item.title} />
                    </div>
                    <div className="item-desc flex col j-between">
                        <h3>About this piece:</h3>
                        <p>{item.description}</p>
                        <p>price: ${item.price}</p>
                        {/* <p>{item.tags}</p> */}
                        <button className="purchase-btn">Purchase</button>
                    </div>
                </div>
                <div>
                    <Link to={`/user/${item.seller._id}`}><img className="profile-img" src={item.seller.imgUrl} alt={item.seller.fullname} /></Link>
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
