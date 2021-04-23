import { Component } from 'react'
import { connect } from 'react-redux'
import { UserList } from '../cmps/UserList.jsx'
import { ItemList } from '../cmps/ItemList.jsx'
import { AppFilter } from '../cmps/AppFilter'
import { loadItems } from '../store/actions/itemActions'
import { AppSorter } from '../cmps/AppSorter.jsx'

class _Explore extends Component {

    state = {
        items: JSON.parse(JSON.stringify(this.props.items)),
        txt: ''
    }

    componentDidMount() {
        const { sortBy } = this.props.location
        if (sortBy) this.onSort({ type: sortBy, ascending: false })
        window.scrollTo(0, 0)
    }

    onFilter = async txt => {
        const items = await this.props.loadItems(txt)
        this.setState({ items, txt })
    }

    onSort = sortParams => {
        let { items } = this.state
        switch (sortParams.type) {
            case 'date': sortParams.ascending ? items.sort((a, b) => a.createdAt - b.createdAt)
                : items.sort((a, b) => b.createdAt - a.createdAt)
                break
            case 'available': sortParams.ascending ? items.sort((a, b) => b.purchasedAt - a.purchasedAt)
                : items.sort((a, b) => a.purchasedAt - b.purchasedAt)
                break
            default: items = JSON.parse(JSON.stringify(this.props.items))
        }
        this.setState({
            ...this.state,
            items: items
        })
    }

    render() {
        const { users, location } = this.props
        const { items, txt } = this.state

        return <section className="explore m-page main-layout">
            <AppFilter initialFilter={location.filterBy} onFilter={this.onFilter} />
            <p>Top Artists</p>
            <UserList users={users} items={this.props.items} />
            <AppSorter initialSort={location.sortBy} onSort={this.onSort} />
            <p className={txt ? "d-block" : "d-none"}>Results for {txt}</p>
            <ItemList users={users} items={items} />
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