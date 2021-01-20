import { Component } from 'react'
import { connect } from 'react-redux'
import { UserList } from '../cmps/UserList.jsx'
import { ItemList } from '../cmps/ItemList.jsx'
import { AppFilter } from '../cmps/AppFilter'

class _Explore extends Component {

    // onSetFilter = (filterTxt) => {
    //     this.props.loadItems(filterTxt)
    // }

    componentDidMount() { window.scrollTo(0, 0) }


    render() {
        const { users, items } = this.props
        return <section className="explore m-page main-layout">
            <AppFilter initialFilter={this.props.location.type} />
            <UserList users={users} items={items} />
            <ItemList users={users} items={items} withProfile />
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

export const Explore = connect(mapStateToProps)(_Explore)
