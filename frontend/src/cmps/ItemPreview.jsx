import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Rating } from '@material-ui/lab'
import { utilService } from '../services/utilService.js'
// import { Button } from '@material-ui/core'

function _ItemPreview({ item, withProfile, minified }) {
    const userRating = utilService.calcRate(item.seller)

    if (minified) return <section className="item-preview min">
        <Link to={`/item/${item._id}`}><img className={'item-img min'} src={item.imgUrl} alt="" /></Link>
    </section>

    return <section className="item-preview">
        <Link to={`/item/${item._id}`}>
            <img className="item-img" src={item.imgUrl} alt="" />
        </Link>
        <h3>{item.title}</h3>
        {withProfile && <Link to={`/user/${item.seller._id}`} className="info-container flex a-center">
            <img className="user-img" src={item.seller.imgUrls.profile} alt="" />
            <div>
                <h4>{item.seller.fullname}</h4>
                <div className="flex">
                    <Rating name="rating" value={userRating} readOnly size="small" />
                    <p className="muted">({item.seller.reviews.length})</p>
                </div>
            </div>
        </Link>}
        
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