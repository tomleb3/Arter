import { Component } from 'react'
import { connect } from 'react-redux'
import { UserList } from '../cmps/UserList.jsx'
import { ItemList } from '../cmps/ItemList.jsx'
import { AppFilter } from '../cmps/AppFilter'
import { loadItems } from '../store/actions/itemActions'
import swal from '@sweetalert/with-react'

class _Explore extends Component {

    // onSetFilter = (filterTxt) => {
    //     this.props.loadItems(filterTxt)
    // }

    state = {
        items: []
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        this.setState({ items: this.props.items })

        // swal(
        //     <div className="swal">
        //         <h1>Hey there!</h1>
        //         <p className="site-clr1">Masheo</p>
        //     </div>)
    }

    onFilter = async title => {
        const items = await this.props.loadItems(title)
        this.setState({ items })
    }

    render() {
        const { users } = this.props
        const { items } = this.state

        return <section className="explore m-page main-layout">
            <AppFilter initialFilter={this.props.location.type} onFilter={this.onFilter} />
            <p>Top Artists</p>
            <UserList users={users} items={this.props.items} />
            <ItemList users={users} items={items} withProfile />
        </section>
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.userModule.users,
        items: state.itemModule.items,
    }
}
const mapDispatchToProps = {
    loadItems
}
export const Explore = connect(mapStateToProps, mapDispatchToProps)(_Explore)