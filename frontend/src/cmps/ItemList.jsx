import { connect } from 'react-redux'
import { ItemPreview } from "./ItemPreview.jsx"

function _ItemList({ items }) {

    if (!items || !items.length) return <div className="loader"></div>

    return <div className="item-list grid main-layout">
        {items.length && items.map(item => {
            return <ItemPreview key={item._id} item={item} />
        })}
    </div>
}

const mapStateToProps = (state) => {
    return { items: state.itemModule.items }
}

export const ItemList = connect(mapStateToProps)(_ItemList)