import { Component } from 'react'
import { connect } from 'react-redux'
import { userService } from '../services/userService'
import { Button, TextField } from '@material-ui/core'
import { editUser } from '../store/actions/userActions'
import { Uploader } from '../cmps/Uploader'

// Social icons -
import facebookIcon from '../assets/imgs/socials-icons/facebook.svg'
import instagramIcon from '../assets/imgs/socials-icons/instagram.svg'
import behanceIcon from '../assets/imgs/socials-icons/behance.svg'
import dribbbleIcon from '../assets/imgs/socials-icons/dribbble.svg'
import linkedinIcon from '../assets/imgs/socials-icons/linkedin.svg'
import deviantartIcon from '../assets/imgs/socials-icons/deviantart.svg'

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

    handleInfoInputs = ({ target }) => {
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

    handleSocialInputs = ({ target }) => {
        const field = target.name
        let value = target.value

        this.setState(prevState => {
            return {
                ...this.state,
                user: {
                    ...prevState.user,
                    socialLinks: {
                        ...prevState.user.socialLinks,
                        [field]: value
                    }
                }
            }
        })
    }

    onUploadImg = (url, type) => {
        this.setState(prevState => {
            return {
                ...this.state,
                user: {
                    ...prevState.user,
                    imgUrls: {
                        ...prevState.user.imgUrls,
                        [type]: url
                    }
                }
            }
        })
    }

    onSaveUser = async ev => {
        ev.preventDefault()
        const { user } = this.state
        try {
            await this.props.editUser(user)
        }
        catch (err) {
            console.log(err)
        }
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
                <TextField type="text" value={user.fullname} color="secondary" label="Full name" onChange={this.handleInfoInputs} name="fullname" />
                <textarea value={user.description} placeholder="About me" onChange={this.handleInfoInputs} name="description" />
                <TextField type="text" color="secondary" label="Email" value={user.email} onChange={this.handleInfoInputs} name="email" />
                <TextField type="password" color="secondary" label="Password" onChange={this.handleInfoInputs} name="password" />
                <p className="muted">* leave empty to keep current password</p>
                <div className="social-container">
                    <h3>Socials</h3>
                    <div className="flex col wrap j-between">
                        <div>
                            <div className="flex a-center">
                                <img src={facebookIcon} alt="Facebook" />
                                <p>facebook.com/</p>
                                <TextField type="text" name="facebook" onChange={this.handleSocialInputs}
                                    value={user.socialLinks ? user.socialLinks.facebook : ''} />
                            </div>
                            <div className="flex a-center">
                                <img src={instagramIcon} alt="Instagram" />
                                <p>instagram.com/</p>
                                <TextField type="text" name="instagram" onChange={this.handleSocialInputs}
                                    value={user.socialLinks ? user.socialLinks.instagram : ''} />
                            </div>
                        </div>
                        <div>
                            <div className="flex a-center">
                                <img src={behanceIcon} alt="Behance" />
                                <p>behance.net/</p>
                                <TextField type="text" name="behance" onChange={this.handleSocialInputs}
                                    value={user.socialLinks ? user.socialLinks.behance : ''} />
                            </div>
                            <div className="flex a-center">
                                <img src={dribbbleIcon} alt="Dribbble" />
                                <p>dribbble.com/</p>
                                <TextField type="text" name="dribbble" onChange={this.handleSocialInputs}
                                    value={user.socialLinks ? user.socialLinks.dribbble : ''} />
                            </div>
                        </div>
                        <div>
                            <div className="flex a-center">
                                <img src={linkedinIcon} alt="Linkedin" />
                                <p>linkedin.com/in/</p>
                                <TextField type="text" name="linkedin" onChange={this.handleSocialInputs}
                                    value={user.socialLinks ? user.socialLinks.linkedin : ''} />
                            </div>
                            <div className="flex a-center">
                                <img src={deviantartIcon} alt="DeviantArt" />
                                <p>deviantart.com/</p>
                                <TextField type="text" name="deviantart" onChange={this.handleSocialInputs}
                                    value={user.socialLinks ? user.socialLinks.deviantart : ''} />
                            </div>
                        </div>
                    </div>
                </div>
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