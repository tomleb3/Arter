import { ItemPreview } from "./ItemPreview.jsx"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

export function ItemList({ items, users, withProfile }) {

    if (!items.length || !users.length) {
        return <div className="item-list main-layout">
            <div className="loader"></div>
        </div>
    }
    return (
        <ResponsiveMasonry columnsCountBreakPoints={{ 400: 1, 650: 2, 900: 3, 1400: 4 }}>
            <Masonry columnsCount={4} gutter="30px">
                {items.map(item => {
                    const user = users.find(user => item.seller._id === user._id)

                    return <ItemPreview key={item._id} item={item} user={user} withProfile={withProfile} />
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