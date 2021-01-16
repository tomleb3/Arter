import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { loadItems } from '../store/actions/itemActions'

class _AppFilter extends Component {

    inputRef = React.createRef()

    state = {
        title: this.props.initialFilter || '',
    }

    componentDidMount() { this.handleChange() }
    componentWillUnmount() { this.setState({ title: '' }) }

    handleChange = () => {
        const { value } = this.inputRef.current

        this.setState(({ title: value }), () => {
            this.props.loadItems(this.state.title)
        })
    }

    onFilter = (ev) => {
        ev.preventDefault()
        // this.props.onSetFilter(this.state.title)
        this.props.loadItems(this.state.title)
    }

    render() {
        const { title } = this.state

        return (
            <section className="app-filter main-layout">
                <form className="filter-form" onSubmit={this.onFilter}>
                    <input className="search-bar" placeholder="Search" type="text" name='title' value={title} ref={this.inputRef} onChange={this.handleChange} />
                </form>
            </section>
        )
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

export const AppFilter = connect(mapStateToProps, mapDispatchToProps)(_AppFilter)