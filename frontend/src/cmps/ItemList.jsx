import { ItemPreview } from "./ItemPreview.jsx"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

export function ItemList({ items, minified }) {

    if (!items.length) {
        return <div className="item-list main-layout">
            <p className="no-items-txt muted">No items found...</p>
        </div>
    }
    return (
        <ResponsiveMasonry columnsCountBreakPoints={{ 450: 1, 700: 2, 1000: 3 }}>
            <Masonry gutter="30px">
                {items.map(item => {
                    return <ItemPreview key={item._id} item={item} minified={minified} />
                })}
            </Masonry>
        </ResponsiveMasonry>
    )
}