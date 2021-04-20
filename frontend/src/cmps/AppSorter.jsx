import { Component } from 'react'
import { Button, ButtonGroup } from '@material-ui/core'

export class AppSorter extends Component {

    state = {
        sortParams: {
            type: this.props.initialSort || '',
            ascending: false
        }
    }

    handleChange = sortBy => {
        const { onSort } = this.props
        let { type, ascending } = this.state.sortParams
        if (type === sortBy) ascending = !ascending
        else ascending = false
        this.setState(({
            sortParams: {
                type: sortBy,
                ascending: ascending
            }
        }), () => onSort(this.state.sortParams))
    }

    render() {
        let { type, ascending } = this.state.sortParams

        return <section className="app-sorter flex j-end">
            <ButtonGroup variant="text">
                <Button onClick={() => this.handleChange('')}>
                    <span className={`btn-all ${!type && 'active'}`}>All</span>
                </Button>
                <Button onClick={() => this.handleChange('date')}>
                    <i className={`arrow ${!ascending && 'down'} ${type === 'date' ? 'visible' : 'hidden'}`}></i>
                    <span className="btn-date">Date</span>
                </Button>
                <Button onClick={() => this.handleChange('available')}>
                    <i className={`arrow ${!ascending && 'down'} ${type === 'available' ? 'visible' : 'hidden'}`}></i>
                    <span className="btn-available">Available</span>
                </Button>
            </ButtonGroup>
        </section>
    }
}