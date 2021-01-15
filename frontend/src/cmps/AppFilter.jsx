import { Component } from 'react'

export class AppFilter extends Component {

    state = {
        filterBy: {
            title: '',
        }
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value =  target.value
        this.setState(prevState => ({ filterBy: { ...prevState.filterBy, [field]: value } }), () => {
            this.props.onSetFilter(this.state.filterBy)
        })
    }

    onFilter = (ev) => {
        ev.preventDefault()
        this.props.onSetFilter(this.state.filterBy)
    }

    render() {
        const {title} = this.state.filterBy
        return (
            <section className="app-filter main-layout">
                <form className="filter-form" onSubmit={this.onFilter}>
                    <input className="search-bar" placeholder="Search" type="text" name='title' value={title} onChange={this.handleChange} />
                </form>
            </section>
        )
    }
}