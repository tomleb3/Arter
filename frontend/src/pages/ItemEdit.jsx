
import { Component } from 'react'
import { connect } from 'react-redux'
import { loadItems, addItem, editItem } from '../store/actions/itemActions'
import { TextField } from '@material-ui/core'
import { Button } from '@material-ui/core'

class _ItemEdit extends Component {

    state = {
        item: {
            title: '',
            price: 0,
            description: '',
            // tags: ['Traditional'],
            // seller: this.props.loggedInUser.username
            
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params
        if (id) {
            const item = this.props.items.find(item => {
                return item._id === id
            })
            this.setState({ item: item })
        }
    }

    handleInput = ({ target }) => {
        const field = target.name
        let value = target.value
        value = (field === 'price') ? +value : value
        if (field === 'price' && value < 0) return

        this.setState(prevState => {
            return {
                item: {
                    ...prevState.item,
                    [field]: value
                }
            }
        })
    }

    onSaveItem = (ev) => {
        ev.preventDefault()
        const { item } = this.state
        // if (!toy.name) return
        if (item._id) {
            this.props.editItem(item).then(() => this.props.history.push('/explore'))
        } else {
            this.props.addItem(item).then(() => this.props.history.push('/explore'))
        }
        this.setState({ item: { title: '', price: 0, description:''}})
    }

    render() {
        // console.log(this.props.loggedInUser)
        const { item } = this.state
        // if (!item) return <div className="loader"></div>
        return (
            <div className="item-edit m-page">
                {/* <h3>{toy._id ? 'Update' : 'Add'} Toy</h3> */}
                <form className="flex col j-between" onSubmit={this.onSaveItem}>
                    <TextField id="standard-secondary" label="Name" type="text" name="title" value={item.title} placeholder="Title" color="secondary" onChange={this.handleInput} />
                    <TextField label="Price" type="number" value={item.price} onChange={this.handleInput} name="price" />
                    <textarea label="Description" type="text" value={item.description} onChange={this.handleInput} name="description" />
                    <Button type="submit" color='powderblue'>Save</Button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // loggedInUser: state.userModule.loggedInUser
        users: state.userModule.users,
        items: state.itemModule.items,
    }
}

const mapDispatchToProps = {
    loadItems,
    addItem,
    editItem
}

export const ItemEdit = connect(mapStateToProps, mapDispatchToProps)(_ItemEdit)





// <TextField id="standard-secondary" label="Name" type="text" name="name" value={item.title} placeholder="Title" color="secondary" onChange={this.handleInput} />
// <TextField label="Price" type="number" min="0" value={item.price} onChange={this.handleInput} name="price" />
// <TextField label="Description" type="text" value={item.description} onChange={this.handleInput} name="description" />
// <Button type="submit" color='secondary'>Save</Button>