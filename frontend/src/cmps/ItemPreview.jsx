import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { editUser } from '../store/actions/userActions'
import { utilService } from '../services/utilService.js'
import StarIcon from '@material-ui/icons/Star'

function _ItemPreview({ item, minified, loggedInUser, editUser }) {

    const userRating = utilService.calcRate(item.seller)

    const dynamicLikeButton = () => {
        if (!loggedInUser) return
        const isLiked = loggedInUser.favorites && loggedInUser.favorites.includes(item._id)
        return <button onClick={() => onToggleLike(isLiked)}>
            {isLiked ? <svg aria-label="Unlike" className="pointer" fill="#ed4956" height="20" viewBox="0 0 48 48" width="20">
                <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12
             10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6
              2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
            </svg>
                : <svg aria-label="Like" className="pointer" fill="#262626" height="20" viewBox="0 0 48 48" width="20">
                    <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3
                 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4
                  6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3
                   3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6
                    3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4
                     3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2
                      7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                </svg>}
        </button>
    }
    const onToggleLike = async isLiked => {
        const user = JSON.parse(JSON.stringify(loggedInUser))
        try {
            if (isLiked) {
                user.favorites = user.favorites.filter(like => {
                    return like !== item._id
                })
            }
            else {
                // Add to user.favorites if it exists, create it if it doesn't:
                user.favorites ? user.favorites.unshift(item._id)
                    : user.favorites = [item._id]
            }
            await editUser(user)
        }
        catch (err) {
            console.log(err)
        }
    }

    if (minified) return <section className="item-preview min">
        <Link to={`/item/${item._id}`}><img className={'item-img min'} src={item.imgUrl} alt="" /></Link>
        <div className="item-info">
            <div className="flex j-between a-center">
                <Link to={`/item/${item._id}`}><h3>{item.title}</h3></Link>
                {dynamicLikeButton()}
            </div>
            <Link to={`/user/${item.seller._id}`} className="user-name"><p>{item.seller.fullname}</p></Link>
            {item.purchasedAt ? <p className="site-clr3">SOLD</p> : <p>${item.price}</p>}
        </div>
    </section>


    return <section className="item-preview">
        <Link to={`/item/${item._id}`}><img className="item-img" src={item.imgUrl} alt="" /></Link>
        <div className="flex j-between">
            <div className="item-info">
                <div className="flex j-between">
                    <div className="flex">
                        <Link to={`/user/${item.seller._id}`} className="user-name flex a-center"><p>{item.seller.fullname}</p></Link>
                        {userRating &&
                            <Fragment>
                                <StarIcon color="secondary" readOnly fontSize="small" />
                                <p className="user-rating font-mont">{userRating}</p>
                            </Fragment>}
                    </div>
                </div>
                <Link to={`/item/${item._id}`}><h3>{item.title}</h3></Link>
                {item.purchasedAt ? <p className="site-clr3">SOLD</p> : <p className="font-mont">${item.price}</p>}
            </div>
            {dynamicLikeButton()}
        </div>
    </section>
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser
    }
}
const mapDispatchToProps = {
    editUser
}
export const ItemPreview = connect(mapStateToProps, mapDispatchToProps)(_ItemPreview)