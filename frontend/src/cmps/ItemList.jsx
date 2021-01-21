import { ItemPreview } from "./ItemPreview.jsx"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

export function ItemList({ items, minified, withProfile }) {

    if (!items.length) {
        return <div className="item-list main-layout">
            <div>No items found...</div>
        </div>
    }
    return (
        <ResponsiveMasonry columnsCountBreakPoints={{ 450: 1, 700: 2, 1000: 3 }}>
            <Masonry gutter="30px">
                {items.map(item => {
                    return <ItemPreview key={item._id} item={item} withProfile={withProfile} minified={minified} />
                })}
            </Masonry>
        </ResponsiveMasonry>
    )

    // return <section className="item-list grid j-center">
    //     {items.map(item => {
    //         return <ItemPreview key={item._id} item={item} withProfile={withProfile} />
    //     })}
    // </section>
}