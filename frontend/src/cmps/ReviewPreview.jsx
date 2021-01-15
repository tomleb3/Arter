import React from 'react'
import { Rating } from '@material-ui/lab'
import { Link } from 'react-router-dom'
// import { LongTxt } from './LongTxt';


export function ReviewPreview({ review }) {

    return <article className="review-preview">
        <Link to={`/user/${review.byUser._id}`} className="reviewer-info flex a-center">
            <img src={review.byUser.imgUrl}></img>
            <div>
                <h4>{review.byUser.fullname}</h4>
                <small className="muted">{new Date(review.createdAt).toLocaleDateString("en-US")}</small>
            </div>
        </Link>
        <Rating value={review.rate} readOnly size="small" />
        <p>{review.txt}</p>
    </article>
}