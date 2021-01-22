// import { Component } from 'react'
// import { connect } from 'react-redux'
// import { loadUsers, addUser, editUser, removeUser } from '../store/actions/userActions'
// import { TextField } from '@material-ui/core'
// import { Button } from '@material-ui/core'
// import { Uploader } from '../cmps/Uploader.jsx'

// class _UserEdit extends Component {

//     state = {

//     }

//     handleInput = ({ target }) => {
//         const field = target.name
//         let value = target.value
//         value = (field === 'price') ? +value : value
//         if (field === 'price' && value < 0) return

//         this.setState(prevState => {
//             return {
//                 item: {
//                     ...prevState.item,
//                     [field]: value
//                 }
//             }
//         })
//     }

//     onUploadImg = (url) => {
//         this.setState(prevState => {
//             return {
//                 item: {
//                     ...prevState.item,
//                     imgUrl: url
//                 }
//             }
//         })
//         console.log('img url', url);
//     }

//     onSaveItem = async (ev) => {
//         ev.preventDefault()
//         const { item } = this.state
//         if (item._id) {
//             await this.props.editItem(item)
//             this.props.history.push(`/item/${item._id}`)
//         } else {
//             await this.props.addItem(item)
//             this.props.history.push(`/user/${item.seller._id}`)
//         }
//     }

//     render() {
//         // console.log(this.props.loggedInUser)
//         // const { user } = this.state
//         // if (!user) return <div className="loader m-page"></div>
//         return (
//             <div className="user-edit m-page">
//                 {/* <h3>{toy._id ? 'Update' : 'Add'} Toy</h3> */}
//                 <form className="flex col j-between" autoComplete="off" onSubmit={this.onSaveUser}>
//                     <textarea label="Description" type="text" value={user.description} onChange={this.handleInput} name="description" />
//                     <Uploader onFinishUpload={this.onUploadImg} />
//                     <div>
//                         {/* {user._id && <Button type="button" onClick={() => this.onRemoveUser(user._id)}>Delete User</Button>} */}
//                         <Button type="submit">Save</Button>
//                     </div>
//                 </form>
//             </div>
//         )
//     }
// }

// const mapStateToProps = state => {
//     return {
//         loggedInUser: state.userModule.loggedInUser,
//         items: state.itemModule.items,
//         users: state.userModule.users,
//     }
// }

// const mapDispatchToProps = {

// }

// export const UserEdit = connect(mapStateToProps, mapDispatchToProps)(_UserEdit)


























// // <TextField id="standard-secondary" label="Name" type="text" name="name" value={user.title} placeholder="Title" color="secondary" onChange={this.handleInput} />
// // <TextField label="Price" type="number" min="0" value={user.price} onChange={this.handleInput} name="price" />
// // <TextField label="Description" type="text" value={user.description} onChange={this.handleInput} name="description" />
// // <Button type="submit" color='secondary'>Save</Button>