import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { utilService } from '../services/utilService.js'
import StarIcon from '@material-ui/icons/Star'
// import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'

export function ItemPreview({ item, withProfile, minified }) {
    const userRating = utilService.calcRate(item.seller)

    if (minified) return <section className="item-preview min">
        <Link to={`/item/${item._id}`}><img className={'item-img min'} src={item.imgUrl} alt="" /></Link>
        <div className="item-info">
            <div className="flex j-between a-center">
                <Link to={`/item/${item._id}`}><h3>{item.title}</h3></Link>
                {item.purchasedAt ? <p className="site-clr3">SOLD</p> : <p>${item.price}</p>}
            </div>
            {withProfile && <Link to={`/user/${item.seller._id}`} className="user-name"><p>{item.seller.fullname}</p></Link>}
        </div>
    </section>



    return <section className="item-preview">
        <Link to={`/item/${item._id}`}><img className="item-img" src={item.imgUrl} alt="" /></Link>
        <div className="flex j-between">
            <div className="item-info">
                {withProfile && <div className="flex j-between">
                    <div className="flex">
                        <Link to={`/user/${item.seller._id}`} className="user-name flex a-center"><p>{item.seller.fullname}</p></Link>
                        {userRating &&
                            <Fragment>
                                <StarIcon color="secondary" readOnly fontSize="small" />
                                <p className="user-rating font-mont">{userRating}</p>
                            </Fragment>}
                    </div>
                </div>}
                <Link to={`/item/${item._id}`}><h3>{item.title}</h3></Link>
                {item.purchasedAt ? <p className="site-clr3">SOLD</p> : <p className="font-mont">${item.price}</p>}
            </div>
            {/* <FavoriteBorderIcon className="fav-icon pointer site-clr3" fontSize="" /> */}
        </div>
    </section>
}