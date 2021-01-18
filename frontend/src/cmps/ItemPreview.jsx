import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Rating } from '@material-ui/lab'
import { utilService } from '../services/utilService.js'
// import { Button } from '@material-ui/core'

function _ItemPreview({ item, user, withProfile }) {
    const userRating = utilService.calcRate(user)

    return <section className="item-preview">
        <Link to={`/item/${item._id}`}>
            <img className="item-img" src={item.imgUrl} alt=""></img>
        </Link>
        {withProfile && <Link to={`/user/${item.seller._id}`} className="info-container flex a-center">
            <img className="user-img" src={user.imgUrls.profile} alt=""></img>
            <div>
                <h4>{item.seller.fullname}</h4>
                <div className="flex">
                    <Rating name="rating" value={userRating} readOnly size="small" />
                    <p className="muted">({user.reviews.length})</p>
                </div>
            </div>
        </Link>}
        <h3>{item.title}</h3>
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