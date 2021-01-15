import { Component } from 'react'
import { UserList } from '../cmps/UserList.jsx'
import { ItemList } from '../cmps/ItemList.jsx'
import { AppFilter } from '../cmps/AppFilter'
import { loadItems, removeItem } from '../store/actions/itemActions'
import { connect } from 'react-redux'

class _Explore extends Component {

    // componentDidMount(){
    //     this.props.loadItems()
    // }

    onSetFilter = (filterBy) => {
        this.props.loadItems(filterBy)
    }

    onRemoveItem = (itemId) => {
        this.props.removeItem(itemId)
    }

    render() {
        const { users } = this.props
        const { items } = this.props
        console.log(items,'wtf');
        return <section className="explore m-page">
            <AppFilter onSetFilter={this.onSetFilter} />
            <UserList users={users} items={items} />
            <ItemList items={items} onRemove={this.onRemoveItem}/>
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
    loadItems,
    removeItem
}

export const Explore = connect(mapStateToProps, mapDispatchToProps)(_Explore)