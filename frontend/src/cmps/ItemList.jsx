import { ItemPreview } from "./ItemPreview.jsx"

export function ItemList({ items, withProfile }) {

    if (!items || !items.length) {
        return <div className="item-list main-layout">
            <div className="loader"></div>
        </div>
    }
    return <section className="item-list grid j-center">
        {items.map(item => {
            return <ItemPreview key={item._id} item={item} withProfile={withProfile} />
        })}
    </section>
}