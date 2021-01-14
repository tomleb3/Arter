import { Component } from 'react'
import { UserList } from '../cmps/UserList.jsx'
import { ItemList } from '../cmps/ItemList.jsx'
import {AppFilter} from '../cmps/AppFilter'
import { loadItems } from '../store/actions/itemActions'
import { connect } from 'react-redux'

class _Explore extends Component {

    onSetFilter = (filterBy) => {
        this.props.loadItems(filterBy)
    }

    render() {
        return <section className="explore">
            <AppFilter onSetFilter={this.onSetFilter} />
            <UserList />
            <ItemList />
        </section>
    }
}

const mapStateToProps = (state) => {
    return {
      // loggedInUser: state.userModule.loggedInUser
    }
  }
  
  const mapDispatchToProps = {
    loadItems
    // loadUsers
  }
  
  export const Explore = connect(mapStateToProps, mapDispatchToProps)(_Explore)