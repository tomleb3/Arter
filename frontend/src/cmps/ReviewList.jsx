import { ReviewPreview } from './ReviewPreview.jsx'

export function ReviewList({ reviews }) {

    return <section className="review-list">
        {reviews.length ? reviews.map(review => <ReviewPreview key={review.id} review={review} />)
            : <p className="muted">No reviews yet...</p>}
    </section>
}