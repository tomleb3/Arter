import { Component } from 'react'
import { connect } from 'react-redux'
import { userService } from '../services/userService'
import { Button, TextField } from '@material-ui/core'
import { editUser } from '../store/actions/userActions'
import { Uploader } from '../cmps/Uploader'

class _UserEdit extends Component {

    state = {
        user: JSON.parse(JSON.stringify(this.props.loggedInUser))
    }

    componentDidMount() {
        this.loadUser()
    }

    loadUser = async () => {
        const { id } = this.props.match.params
        const user = await userService.getById(id)
        this.setState({ user })
    }

    handleInput = ({ target }) => {
        const field = target.name
        let value = target.value

        this.setState(prevState => {
            return {
                ...this.state,
                user: {
                    ...prevState.user,
                    [field]: value
                }
            }
        })
    }

    onUploadImg = (url, type) => {
        console.log(url,type)
        this.setState(prevState => {
            return {
                ...this.state,
                user: {
                    ...prevState.user,
                    imgUrls: {
                        ...this.state.user.imgUrls,
                        [type]: url
                    }
                }
            }
        })
    }

    onSaveUser = async ev => {
        ev.preventDefault()
        const { user } = this.state
        await this.props.editUser(user)
        this.props.history.push(`/user/${user._id}`)
    }

    render() {
        const { user } = this.state

        return <section className="user-edit main-layout m-page">
            <div className="imgs-container">
                <img className="banner-img" src={user.imgUrls.banner} alt="" />
                <Uploader onFinishUpload={this.onUploadImg} />
                <img className="profile-img" src={user.imgUrls.profile} alt={user.fullname} alt="" />
                <Uploader smallMode onFinishUpload={this.onUploadImg} />
            </div>
            <form onSubmit={this.onSaveUser} className="flex col">
                <TextField type="text" value={user.fullname} color="secondary" label="Full name" onChange={this.handleInput} name="fullname" />
                <textarea value={user.description} placeholder="About me" onChange={this.handleInput} name="description" />
                <TextField type="text" color="secondary" label="Email" value={user.email} onChange={this.handleInput} name="email" />
                <TextField type="password" color="secondary" label="Password" onChange={this.handleInput} name="password" />
                <div className="btns-container">
                    <Button type="button" className="btn-cancel" onClick={this.props.history.goBack}>Cancel</Button>
                    <Button type="submit" className="btn-save">Save</Button>
                </div>
            </form>
        </section>
    }
}
const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser
    }
}
const mapDispatchToProps = {
    editUser
}
export const UserEdit = connect(mapStateToProps, mapDispatchToProps)(_UserEdit)