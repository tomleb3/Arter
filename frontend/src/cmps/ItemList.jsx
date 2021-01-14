import { connect } from 'react-redux'
import { ItemPreview } from "./ItemPreview.jsx"

function _ItemList({ items }) {

    if (!items || !items.length) {
        return <div className="item-list main-layout">
            <div className="loader"></div>
        </div>
    }
    return <section className="item-list grid main-layout">
        {items && items.map(item => {
            return <ItemPreview key={item._id} item={item} />
        })}
    </section>
}

const mapStateToProps = (state) => {
    return {
        items: state.itemModule.items
    }
}

export const ItemList = connect(mapStateToProps)(_ItemList)