import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

function _ItemPreview({ item }) {
    console.log(item)

    return <article className="item-preview">

        <Link to={`/item/${item._id}`}>
            <img className="item-img" src={item.imgUrl}></img>
        </Link>
        <div className="info-container">
            <Link to={`/user/${item.seller._id}`}>
                <div className="profile-container flex a-center">
                    <img className="user-img" src={item.seller.imgUrl}></img>
                    <h5>{item.seller.fullname}</h5>
                </div>
            </Link>
            <h3>{item.title}</h3>
        </div>
        <div className="bottom-container">
            <h5 className="right">${item.price}</h5>
        </div>
    </article>
}

const mapStateToProps = (state) => {
    return {
        // loggedInUser: state.userModule.loggedInUser
    }
}

const mapDispatchToProps = {
    // removeItem
}

export const ItemPreview = connect(mapStateToProps, mapDispatchToProps)(_ItemPreview)