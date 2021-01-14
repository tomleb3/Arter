import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { UserPreview } from './UserPreview';
// import { LongTxt } from './LongTxt';

export function ReviewPreview({ review }) {
    return (
        <div className="review-preview">
            <UserPreview user={review.by} date={review.createdAt}/>
            <StyledRating value={review.rate} readOnly />
{/*             <LongTxt length={120} txt={review.txt}/>      */}
        </div>
    )
}

const StyledRating = withStyles({ iconFilled: { color: '$clr1' } })(Rating);

// export default function reviewPreview() {
//     return (
//         <div>
            
//         </div>
//     )
// }
