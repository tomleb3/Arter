import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
// import { Button } from '@material-ui/core'

function _ItemPreview({ item, withProfile }) {

    return <section className="item-preview">
        <Link to={`/item/${item._id}`}>
            <img className="item-img" src={item.imgUrl} alt=""></img>
        </Link>
        <div className="info-container">
            {withProfile && <Link to={`/user/${item.seller._id}`} className="profile-container flex a-center">
                <img className="user-img" src={item.seller.imgUrl} alt=""></img>
                <h4>{item.seller.fullname}</h4>
                {/* <Rating name="rating" value={item.seller.} /> */}
            </Link>}
            <h3>{item.title}</h3>
        </div>
        <div className="bottom-container">
            <h5 className="right">${item.price}</h5>
        </div>
    </section>
}

const mapStateToProps = (state) => {
    return {
        // loggedInUser: state.userModule.loggedInUser
    }
}


export const ItemPreview = connect(mapStateToProps)(_ItemPreview)