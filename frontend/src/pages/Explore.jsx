import { Component } from 'react'
import { connect } from 'react-redux'
import { loadItems } from '../store/actions/itemActions.js'
import { ItemList } from '../cmps/ItemList.jsx'

export class _Explore extends Component {

    componentDidMount() {
        this.props.loadItems()
    }

    render() {
        return <section className="explore">
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
}

export const Explore = connect(mapStateToProps, mapDispatchToProps)(_Explore)