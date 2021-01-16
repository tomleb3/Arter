import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { removeItem } from '../store/actions/itemActions'

function _ItemPreview({ item, removeItem }) {

    return <section className="item-preview">
        <Link to={`/item/${item._id}`}>
            <img className="item-img" src={item.imgUrl} alt=""></img>
        </Link>
        <div className="info-container">
            <Link to={`/user/${item.seller._id}`} className="profile-container flex a-center">
                <img className="user-img" src={item.seller.imgUrl} alt=""></img>
                <h5>{item.seller.fullname}</h5>
            </Link>
            <h3>{item.title}</h3>
        </div>
        <div className="bottom-container">
            <h5 className="right">${item.price}</h5>
            <Button className="remove-btn" color="secondary" onClick={() => removeItem(item._id)}>X</Button>
        </div>
    </section>
}

const mapStateToProps = (state) => {
    return {
        // loggedInUser: state.userModule.loggedInUser
    }
}

const mapDispatchToProps = {
    removeItem
}

export const ItemPreview = connect(mapStateToProps, mapDispatchToProps)(_ItemPreview)