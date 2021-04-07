import { Component } from 'react'
import { connect } from 'react-redux'
import { loadItems, addItem, editItem, removeItem } from '../store/actions/itemActions'
import { TextField } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { Uploader } from '../cmps/Uploader.jsx'
import { utilService } from '../services/utilService.js'

class _ItemEdit extends Component {

    state = {
        item: {
            title: '',
            price: 0,
            description: '',
            imgUrl: '',
            size: '',
            tags: [],
            // seller: this.props.loggedInUser.email
        },
        tagToAdd: ''
    }

    async componentDidMount() {
        // if (!this.props.items.length) await this.props.loadItems()
        window.scrollTo(0, 0)
        const { id } = this.props.match.params
        if (id) {
            const item = this.props.items.find(item => item._id === id)
            this.setState({ item: item })
        }
    }

    onUploadImg = url => {
        this.setState(prevState => {
            return {
                ...this.state,
                item: {
                    ...prevState.item,
                    imgUrl: url
                }
            }
        })
    }

    handleInput = ({ target }) => {
        const field = target.name
        let value = target.value
        value = (field === 'price') ? +value : value
        if (field === 'price' && value < 0) return

        this.setState(prevState => {
            return {
                ...this.state,
                item: {
                    ...prevState.item,
                    [field]: value
                }
            }
        })
    }

    onAddTag = ev => {
        ev.preventDefault()
        this.setState({
            ...this.state,
            item: {
                ...this.state.item,
                tags: [
                    ...this.state.item.tags,
                    this.state.tagToAdd
                ]
            },
            tagToAdd: ''
        })
    }

    onRemoveTag = (ev, tagIdx) => {
        ev.preventDefault()
        this.state.item.tags.splice(tagIdx, 1)
        this.setState({ ...this.state })
    }

    onRemoveItem = async itemId => {
        const { item } = this.state
        await this.props.removeItem(itemId)
        this.props.history.push(`/user/${item.seller._id}`)
    }

    onSaveItem = async ev => {
        ev.preventDefault()
        const { item } = this.state
        if (item._id) {
            await this.props.editItem(item)
            this.props.history.push(`/item/${item._id}`)
        } else {
            await this.props.addItem(item)
            this.props.history.push(`/`)
        }
    }

    render() {
        const { item, tagToAdd } = this.state
        const { tags } = this.state.item
        if (!item) return <div className="loader m-page"></div>
        return (
            <div className="item-edit m-page">
                {/* <h3>{item._id ? 'Update' : 'Add'} Item</h3> */}
                <form className="flex col j-between" autoComplete="off" onSubmit={this.onSaveItem}>
                    <TextField id="standard-secondary" label="Name" type="text" name="title" value={item.title} placeholder="Title" color="secondary" onChange={this.handleInput} />
                    <TextField label="Price" type="number" value={item.price} onChange={this.handleInput} name="price" />
                    <TextField label="Size" type="text" value={item.size} onChange={this.handleInput} name="size" />
                    <div>
                        <TextField label="Tag" type="text" name="tag" onKeyDown={ev => ev.key === 'Enter' && this.onAddTag()}
                            onChange={ev => this.setState({ ...this.state, tagToAdd: ev.target.value })} value={tagToAdd} />
                        <button onClick={this.onAddTag}>+</button>
                    </div>
                    {tags.length ? tags.map((tag, idx) => {
                        return <div key={utilService.makeId()}>
                            <label>{tag}</label>
                            <button onClick={ev => this.onRemoveTag(ev, idx)}>x</button>
                        </div>
                    }) : null}
                    <textarea label="Description" type="text" value={item.description} onChange={this.handleInput} name="description" placeholder="Description" />
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