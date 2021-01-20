import { ItemPreview } from "./ItemPreview.jsx"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

export function ItemList({ items, minified, withProfile }) {

    if (!items.length) {
        return <div className="item-list main-layout">
            <div>No items found...</div>
        </div>
    }
    return (
        <ResponsiveMasonry columnsCountBreakPoints={{ 400: 1, 650: 2, 900: 3, 1400: 4 }}>
            <Masonry columnsCount={4} gutter="30px">
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