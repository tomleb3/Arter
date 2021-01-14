import { Component } from 'react'
import { connect } from 'react-redux'



export class _AppFilter extends Component {

    state = {
        filterBy: {
            title: '',
        }
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value =  target.value
        console.log (field)
        this.setState(prevState => ({ filterBy: { ...prevState.filterBy, [field]: value } }), () => {
            this.props.onSetFilter(this.state.filterBy)
            console.log(this.state);
        })
    }

    onFilter = (ev) => {
        ev.preventDefault()
        this.props.onSetFilter(this.state.filterBy)
    }

    render() {
        const {title} = this.state.filterBy
        return (
            <section className="app-filter">
                <form className="filter-form" onSubmit={this.onFilter}>
                    <input placeholder="Search" type="text" name='title' value={title} onChange={this.handleChange} />
                </form>
            </section>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        // toys: state.toyModule.toys,
        // filterBy: state.toyModule.filterBy
    }
}

const mapDispatchToProps = {
}

export const AppFilter = connect(mapStateToProps, mapDispatchToProps)(_AppFilter)