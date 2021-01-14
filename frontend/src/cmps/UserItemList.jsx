import { Fragment } from 'react'
import { connect } from 'react-redux'
import { ItemPreview } from "./ItemPreview.jsx"
import { UserPreview } from "./UserPreview.jsx"

function _UserItemList({ items, users }) {

    return <Fragment>
        {(!users || !users.length) && <div className="user-list main-layout">
            <div className="loader"></div>
        </div>}
        {/* <section className="user-list main-layout">
            {users.length && users.map(user => {
                return <UserPreview key={user._id} user={user} />
            })}
        </section> */}

        {(!items || !items.length) && <div className="item-list main-layout">
            <div className="loader"></div>
        </div>}
        <section className="item-list grid j-center main-layout">
            {items.length && items.map(item => {
                return <ItemPreview key={item._id} item={item} />
            })}
        </section>
    </Fragment>
}

const mapStateToProps = (state) => {
    return {
        items: state.itemModule.items,
        users: state.itemModule.users,
    }
}

export const UserItemList = connect(mapStateToProps)(_UserItemList)