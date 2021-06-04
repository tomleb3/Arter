import React, { createRef } from 'react'
import { Component } from 'react'

export class AppFilter extends Component {

    state = {
        txt: this.props.initialFilter || '',
    }
    filterRef = createRef(null)
    lastScrollY = 0

    componentDidMount() {
        const { txt } = this.state
        if (txt) this.props.onFilter(txt)
        window.addEventListener('scroll', () => this.handleScroll())
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', () => this.handleScroll())
    }

    handleScroll = () => {
        if (!this.filterRef.current) return
        window.scrollY > this.lastScrollY ?
            this.filterRef.current.style.top = '-82px'
            : this.filterRef.current.style.top = '70px'
        this.lastScrollY = window.scrollY
    }

    handleChange = ev => {
        const { value } = ev.target
        this.setState(({ txt: value }), () => this.props.onFilter(this.state.txt))
        window.scrollTo({ top: 0 })
        this.lastScrollY = window.scrollY
    }

    render() {
        const { txt } = this.state
        return <section className="app-filter" ref={this.filterRef}>
            <input className="search-bar" placeholder="Search" type="text"
                autoComplete="off" name="txt" value={txt} onChange={this.handleChange} />
        </section>
    }
}