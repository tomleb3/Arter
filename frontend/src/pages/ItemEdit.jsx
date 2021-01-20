import { Component } from 'react'
import { connect } from 'react-redux'
import { loadItems, addItem, editItem, removeItem } from '../store/actions/itemActions'
import { TextField } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { Uploader } from '../cmps/Uploader.jsx'

class _ItemEdit extends Component {

    state = {
        item: {
            title: '',
            price: 0,
            description: '',
            imgUrl: ''
            // tags: ['Traditional'],
            // seller: this.props.loggedInUser.email
        }
    }

    async componentDidMount() {
        // if (!this.props.items.length) await this.props.loadItems()
        const { id } = this.props.match.params
        if (id) {
            console.log('lieli', this.props.items);
            const item = this.props.items.find(item => item._id === id)
            this.setState({ item: item })
        }
    }

    onUploadImg = (url) => {
        this.setState(prevState => {
            return {
                item: {
                    ...prevState.item,
                    imgUrl: url
                }
            }
        })
        console.log('img url', url);
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

    onRemoveItem = async (itemId) => {
        const { item } = this.state
        await this.props.removeItem(itemId)
        this.props.history.push(`/user/${item.seller._id}`)
    }

    onSaveItem = async (ev) => {
        ev.preventDefault()
        const { item } = this.state
        if (item._id) {
            await this.props.editItem(item)
            this.props.history.push(`/item/${item._id}`)
        } else {
            await this.props.addItem(item)
            this.props.history.push(`/user/${item.seller._id}`)
        }
    }

    render() {
        // console.log(this.props.loggedInUser)
        const { item } = this.state
        if (!item) return <div className="loader m-page"></div>
        return (
            <div className="item-edit m-page">
                {/* <h3>{toy._id ? 'Update' : 'Add'} Toy</h3> */}
                <form className="flex col j-between" autoComplete="off" onSubmit={this.onSaveItem}>
                    <TextField id="standard-secondary" label="Name" type="text" name="title" value={item.title} placeholder="Title" color="secondary" onChange={this.handleInput} />
                    <TextField label="Price" type="number" value={item.price} onChange={this.handleInput} name="price" />
                    <textarea label="Description" type="text" value={item.description} onChange={this.handleInput} name="description" />
                    <Uploader onFinishUpload={this.onUploadImg} />
                    <div>
                        {item._id && <Button type="button" onClick={() => this.onRemoveItem(item._id)}>Delete Item</Button>}
                        <Button type="submit">Save</Button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.userModule.loggedInUser,
        users: state.userModule.users,
        items: state.itemModule.items,
    }
}

const mapDispatchToProps = {
    loadItems,
    addItem,
    editItem,
    removeItem
}

export const ItemEdit = connect(mapStateToProps, mapDispatchToProps)(_ItemEdit)





// <TextField id="standard-secondary" label="Name" type="text" name="name" value={item.title} placeholder="Title" color="secondary" onChange={this.handleInput} />
// <TextField label="Price" type="number" min="0" value={item.price} onChange={this.handleInput} name="price" />
// <TextField label="Description" type="text" value={item.description} onChange={this.handleInput} name="description" />
// <Button type="submit" color='secondary'>Save</Button>