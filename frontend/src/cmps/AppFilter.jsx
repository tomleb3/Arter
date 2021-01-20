import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { loadItems } from '../store/actions/itemActions'

class _AppFilter extends Component {

    state = {
        title: this.props.initialFilter || '',
    }

    componentDidMount() {
        this.props.loadItems(this.state.title)
    }

    handleChange = (ev) => {
        const { value } = ev.target
        this.setState(({ title: value }), () => this.onFilter(ev))
    }

    onFilter = (ev) => {
        ev.preventDefault()
        // this.props.onSetFilter(this.state.title)
        this.props.loadItems(this.state.title)
    }

    render() {
        const { title } = this.state

        return (
            <section className="app-filter">
                <form className="filter-form" onSubmit={this.onFilter}>
                    <input className="search-bar" placeholder="Search" type="text" name='title' value={title} onChange={this.handleChange} />
                </form>
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        // loggedInUser: state.userModule.loggedInUser
    }
}
const mapDispatchToProps = {
    loadItems
}
export const AppFilter = connect(mapStateToProps, mapDispatchToProps)(_AppFilter)