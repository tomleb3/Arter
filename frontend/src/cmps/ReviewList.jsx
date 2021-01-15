import { ReviewPreview } from './ReviewPreview.jsx'

export function ReviewList({ reviews }) {

    return <section className="review-list">
        <h3>Reviews</h3>
        {reviews.length ? (reviews.map(review =><ReviewPreview  key={review.id} review={review} />)) : 'No reviews yet...'}
    </section>
}