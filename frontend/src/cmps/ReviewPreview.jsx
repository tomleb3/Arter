import React from 'react'
import { Rating } from '@material-ui/lab';
import { Link } from 'react-router-dom'
// import { UserPreview } from './UserPreview';
// import { LongTxt } from './LongTxt';


export function ReviewPreview({ review }) {

    return <article className="review-preview">
        <Link to={`/user/${review.byUser._id}`}>
            <div className="reviewer-info flex a-center">
                <img src={review.byUser.imgUrl} alt=""></img>
                <h4>{review.byUser.fullname}</h4>
            </div>
        </Link>
        <Rating value={review.rate} readOnly size="small" />
        <p>{review.txt}</p>
    </article>
}