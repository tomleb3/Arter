import { Component } from 'react'
import { UserList } from '../cmps/UserList.jsx'
import { ItemList } from '../cmps/ItemList.jsx'
import { AppFilter } from '../cmps/AppFilter'
import { loadItems } from '../store/actions/itemActions'
import { connect } from 'react-redux'

class _Explore extends Component {

    onSetFilter = (filterBy) => {
        this.props.loadItems(filterBy)
    }

    render() {
        const { users } = this.props
        const { items } = this.props

        return <section className="explore m-page">
            <AppFilter onSetFilter={this.onSetFilter} />
            <UserList users={users} items={items} />
            <ItemList items={items} />
        </section>
    }
}

const mapStateToProps = (state) => {
    return {
        // loggedInUser: state.userModule.loggedInUser
        users: state.userModule.users,
        items: state.itemModule.items,
    }
}

const mapDispatchToProps = {
    loadItems
}

export const Explore = connect(mapStateToProps, mapDispatchToProps)(_Explore)