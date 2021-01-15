import { ReviewPreview } from './ReviewPreview.jsx'
import { ReviewAdd } from './ReviewAdd.jsx'

export function ReviewList({ reviews, onAdd }) {

    return <section className="review-list">
        <div className="flex a-center j-between">
            <h3>Reviews</h3>
            <ReviewAdd onAdd={onAdd} />
        </div>
        {reviews.length ? reviews.map(review => <ReviewPreview key={review.id} review={review} />) : 'No reviews yet...'}
    </section>
}