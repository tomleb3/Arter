import { Component } from 'react'
import { TextField } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import FaceIcon from '@material-ui/icons/Face';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import SecurityIcon from '@material-ui/icons/Security'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

import {
    loadUsers,
    removeUser,
    login,
    logout,
    signup
} from '../store/actions/userActions'

class _LoginSignup extends Component {

    state = {
        currPage: '/login',
        msg: '',
        loginCred: {
            username: '',
            password: ''
        },
        signupCred: {
            username: '',
            password: '',
            fullname: '',
            email: ''
        }
    }

    componentDidMount() {
        this.setState({ currPage: this.props.match.path })
    }

    loginHandleChange = ev => {
        const { name, value } = ev.target
        this.setState(prevState => ({
            loginCred: {
                ...prevState.loginCred,
                [name]: value
            }
        }))
    }

    signupHandleChange = ev => {
        const { name, value } = ev.target
        this.setState(prevState => ({
            signupCred: {
                ...prevState.signupCred,
                [name]: value
            }
        }))
    }

    doLogin = async ev => {
        ev.preventDefault()
        const { username, password } = this.state.loginCred
        if (!username) {
            return this.setState({ msg: 'Please enter user/password' })
        }
        const userCreds = { username, password }
        try {
            await this.props.login(userCreds)
            this.setState({ loginCred: { username: '', password: '' } })
            if (sessionStorage['loggedinUser']) this.props.history.push('/toy')
        } catch (err) {
            return await this.setState({ msg: 'Login failed, try again.' })
        }
    }

    doSignup = async ev => {
        ev.preventDefault()
        const { username, password, firstName, lastName, email } = this.state.signupCred
        if (!username || !password || !firstName || !lastName || !email) {
            return this.setState({ msg: 'All inputs are required' })
        }
        const signupCreds = { username, password, email, fullname: firstName + lastName }
        await this.props.signup(signupCreds)
        this.setState({ signupCred: { username: '', password: '', fullname: '', email: '' } })
        if (sessionStorage['loggedinUser']) this.props.history.push('/toy')
    }

    render() {
        const { loggedInUser } = this.props

        let signupSection = (
            <form className="frm-signup flex col" onSubmit={this.doSignup}>
                <h2>Create Account</h2>
                <TextField
                    type="text"
                    name="email"
                    value={this.state.signupCred.email}
                    onChange={this.signupHandleChange}
                    label="Email"
                />
                <TextField
                    type="text"
                    name="firstName"
                    value={this.state.signupCred.firstName}
                    onChange={this.signupHandleChange}
                    label="First Name"
                />
                <TextField
                    type="text"
                    name="lastName"
                    value={this.state.signupCred.lastName}
                    onChange={this.signupHandleChange}
                    label="Last Name"
                />
                <TextField
                    type="text"
                    name="username"
                    value={this.state.signupCred.username}
                    onChange={this.signupHandleChange}
                    label="Username"
                />
                <TextField
                    name="password"
                    type="password"
                    value={this.state.signupCred.password}
                    onChange={this.signupHandleChange}
                    label="Password"
                />
                <Button className="signup-btn" type="submit" color="secondary" variant="contained">SIGN UP</Button>
            </form>
        )
        let loginSection = (
            <form className="frm-login flex col" onSubmit={this.doLogin}>
                <h2>Sign In</h2>
                <TextField
                    type="text"
                    name="username"
                    value={this.state.loginCred.username}
                    onChange={this.loginHandleChange}
                    label="Username"
                />
                <TextField
                    type="password"
                    name="password"
                    value={this.state.loginCred.password}
                    onChange={this.loginHandleChange}
                    label="Password"
                />
                <Button className="login-btn" type="submit" color="primary" variant="contained">SIGN IN</Button>

                <div className="filler-logos flex j-between">
                    <SecurityIcon></SecurityIcon>
                    <VpnKeyIcon></VpnKeyIcon>
                    <LockOutlinedIcon></LockOutlinedIcon>
                    <VerifiedUserIcon></VerifiedUserIcon>
                </div>
            </form>
        )

        const { msg } = this.state
        const { currPage } = this.state
        return (
            <div className="login-signup">
                { loggedInUser && (
                    <div>
                        <h3>
                            Welcome {loggedInUser.firstName + ' ' + loggedInUser.lastName}
                            <Button color="secondary" onClick={this.props.logout}>LOGOUT</Button>
                        </h3>
                    </div>
                )
                }
                <div className="btn-group flex">
                    <Button color="primary"><Link to='/login'>Login</Link></Button>
                    <Button color="secondary"><Link to='/signup'>Signup</Link></Button>
                </div>
                <p className="muted red">{msg ? '* ' + msg : ''}</p>
                <div className="lock-icon-div flex j-center"><FaceIcon fontSize="large" color={currPage === '/login' ? "primary" : "secondary"}></FaceIcon></div>
                {(!loggedInUser && currPage === '/login') && loginSection}
                {(!loggedInUser && currPage === '/signup') && signupSection}
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.userModule.users,
        loggedInUser: state.userModule.loggedInUser,
    }
}
const mapDispatchToProps = {
    login,
    logout,
    signup,
    removeUser,
    loadUsers
}

export const LoginSignup = connect(mapStateToProps, mapDispatchToProps)(_LoginSignup)