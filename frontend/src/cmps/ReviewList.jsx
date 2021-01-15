import { ReviewPreview } from './ReviewPreview.jsx'
import AddIcon from '@material-ui/icons/Add';
import { ReviewAddModal } from './ReviewAddModal.jsx'

export function ReviewList({ reviews }) {

    return <section className="review-list">
        <div className="flex a-center j-between">
            <h3>Reviews</h3>
            <AddIcon className="pointer" />
        </div>
        {reviews.length ? (reviews.map(review => { return <ReviewPreview review={review} /> })) : 'No reviews yet...'}
        <ReviewAddModal />
    </section>
}