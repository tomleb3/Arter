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
        items: [],
        txt: ''
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        this.setState({ items: this.props.items })

        // swal({
        //     className: "swal",
        //     // icon: "success",
        //     title: "Purchase completed!",
        //     text: "You can view your purchase details in your profile page.",
        //     timer: 6000,
        // })

    }

    onFilter = async txt => {
        const items = await this.props.loadItems(txt)
        this.setState({ items, txt })
    }

    render() {
        const { users } = this.props
        const { items,txt } = this.state

        return <section className="explore m-page main-layout">
            <AppFilter initialFilter={this.props.location.type} onFilter={this.onFilter} />
            <p>Top Artists</p>
            <UserList users={users} items={this.props.items} />
            {txt && <p>Results for {txt}</p>}
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