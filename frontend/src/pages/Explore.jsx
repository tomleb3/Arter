import { Component } from 'react'
import { connect } from 'react-redux'
import { loadItems } from '../store/actions/itemActions.js'
import { loadUsers } from '../store/actions/userActions.js'
import { UserItemList } from '../cmps/UserItemList.jsx'

export class _Explore extends Component {

    componentDidMount() {
        this.props.loadItems()
        this.props.loadUsers()
    }

    render() {
        return <section className="explore">
            <UserItemList />
        </section>
    }
}

const mapStateToProps = (state) => {
    return {
        // loggedInUser: state.userModule.loggedInUser
    }
}

const mapDispatchToProps = {
    loadItems,
    loadUsers
}

export const Explore = connect(mapStateToProps, mapDispatchToProps)(_Explore)