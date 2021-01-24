import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { loadItems } from '../store/actions/itemActions'

class _AppFilter extends Component {

    state = {
        txt: this.props.initialFilter || '',
    }

    componentDidMount() {
        this.props.onFilter(this.state.txt)
    }

    handleChange = (ev) => {
        const { value } = ev.target
        this.setState(({ txt: value }), () => this.props.onFilter(this.state.txt))
    }

    onSubmit = ev => ev.preventDefault()

    render() {
        const { txt } = this.state

        return (
            <section className="app-filter">
                <form className="filter-form" onSubmit={this.onSubmit}>
                    <input className="search-bar" placeholder="Search" type="text" name='txt' value={txt} onChange={this.handleChange} />
                </form>
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        // loggedInUser: state.userModule.loggedInUser
        items: state.itemModule.items
    }
}
const mapDispatchToProps = {
    loadItems
}
export const AppFilter = connect(mapStateToProps, mapDispatchToProps)(_AppFilter)