import React from 'react'
import { Component } from 'react'

export class AppFilter extends Component {

    state = {
        txt: this.props.initialFilter || '',
    }

    componentDidMount() {
        const { txt } = this.state
        if (txt) this.props.onFilter(txt)
    }

    handleChange = ev => {
        const { value } = ev.target
        this.setState(({ txt: value }), () => this.props.onFilter(this.state.txt))
    }

    render() {
        const { txt } = this.state
        return <section className="app-filter">
            <input className="search-bar" placeholder="Search" type="text"
                autoComplete="off" name="txt" value={txt} onChange={this.handleChange} />
        </section>
    }
}