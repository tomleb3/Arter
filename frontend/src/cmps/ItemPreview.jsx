import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { utilService } from '../services/utilService.js'
import StarIcon from '@material-ui/icons/Star';
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

        {withProfile && <div className="flex j-between">
            <div className="flex">
                <Link to={`/user/${item.seller._id}`} className="user-info-container flex a-center"><p>{item.seller.fullname}</p></Link>
                <StarIcon color="secondary" readOnly fontSize="small" />
                <p className="muted">({item.seller.reviews.length})</p>
            </div>
        </div>}
        <Link to={`/item/${item._id}`}><h3>{item.title}</h3></Link>
            {item.purchasedAt ? <p>${item.price}</p> : <p className="site-clr3">SOLD</p>}
    </section>
}

const mapStateToProps = (state) => {
    return {
        // loggedInUser: state.userModule.loggedInUser
    }
}
export const ItemPreview = connect(mapStateToProps)(_ItemPreview)