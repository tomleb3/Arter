import { Component } from 'react'
import { TextField } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import SecurityIcon from '@material-ui/icons/Security'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'

import {
    loadUsers,
    removeUser,
    login,
    logout,
    signup
} from '../store/actions/userActions'
import { socketService } from '../services/socketService'

class _LoginSignup extends Component {

    state = {
        currPage: '/login',
        msg: '',
        loginCred: {
            email: '',
            password: ''
        },
        signupCred: {
            password: '',
            fullname: '',
            email: ''
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
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
        let { email, password } = this.state.loginCred
        if (!email || !password) return this.setState({ msg: 'Please enter user/password' })
        email = email.toLowerCase()
        const userCreds = { email, password }
        try {
            await this.props.login(userCreds)
            this.setState({ loginCred: { email: '', password: '' } })
            if (localStorage['loggedInUser']) {
                socketService.emit('LOGIN', this.props.loggedInUser)
                this.props.history.push('/')
            }
        } catch (err) {
            return this.setState({ ...this.state, msg: err.response.data })
        }
    }

    doSignup = async ev => {
        ev.preventDefault()
        let { email, password, firstName, lastName } = this.state.signupCred
        if (!email || !password || !firstName || !lastName) return this.setState({ msg: 'All fields are required' })
        firstName = firstName.trim().charAt(0).toUpperCase() + firstName.slice(1)
        lastName = lastName.trim().charAt(0).toUpperCase() + lastName.slice(1)
        email = email.trim().toLowerCase()
        let fullname = firstName + ' ' + lastName
        const signupCreds = { email, password, fullname }
        try {
            await this.props.signup(signupCreds)
            this.setState({ signupCred: { email: '', password: '', fullname: '' } })
        }
        catch (err) {
            return this.setState({ ...this.state, msg: err.response.data })
        }
        if (localStorage['loggedInUser']) this.props.history.push('/')
    }

    render() {
        const { loggedInUser } = this.props

        let signupSection = (
            <form className="frm-signup flex col" onSubmit={this.doSignup}>
                <h2>Create Account</h2>
                <TextField
                    type="text"
                    color="secondary"
                    name="email"
                    value={this.state.signupCred.email}
                    onChange={this.signupHandleChange}
                    label="Email"
                    autoComplete="on"
                />
                <TextField
                    type="text"
                    color="secondary"
                    name="firstName"
                    value={this.state.signupCred.firstName}
                    onChange={this.signupHandleChange}
                    label="First Name"
                    autoComplete="on"
                />
                <TextField
                    type="text"
                    color="secondary"
                    name="lastName"
                    value={this.state.signupCred.lastName}
                    onChange={this.signupHandleChange}
                    label="Last Name"
                    autoComplete="on"
                />
                <TextField
                    type="password"
                    name="password"
                    color="secondary"
                    value={this.state.signupCred.password}
                    onChange={this.signupHandleChange}
                    label="Password"
                    autoComplete="off"
                />
                <Button className="signup-btn" type="submit" color="secondary" variant="contained">SIGN UP</Button>
            </form>
        )
        let loginSection = (
            <form className="frm-login flex col" onSubmit={this.doLogin}>
                <h2>Sign In</h2>
                <TextField
                    type="text"
                    name="email"
                    value={this.state.loginCred.email}
                    onChange={this.loginHandleChange}
                    label="Email"
                    autoComplete="on"
                />
                <TextField
                    type="password"
                    name="password"
                    value={this.state.loginCred.password}
                    onChange={this.loginHandleChange}
                    label="Password"
                    autoComplete="off"
                />
                <Button className="login-btn" type="submit" variant="contained">SIGN IN</Button>

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
            <div className="flex j-center">
                <div className="login-signup">
                    {loggedInUser && (
                        <div>
                            <h3>
                                Welcome {loggedInUser.fullname}
                                <Button color="secondary" onClick={this.props.logout}>LOGOUT</Button>
                            </h3>
                        </div>
                    )}
                    <div className="btn-group flex">
                        <Link to='/login' className="link"><Button style={{ color: "#13acca", fontWeight: "bold" }} onClick={() => { this.setState({ currPage: '/login', msg: '' }) }}>Login</Button></Link>
                        <Link to='/signup' className="link"><Button style={{ fontWeight: "bold" }} color="secondary" onClick={() => { this.setState({ currPage: '/signup', msg: '' }) }}>Signup</Button></Link>
                    </div>
                    <p className="muted site-clr3">{msg ? '* ' + msg : ''}</p>
                    <div className="lock-icon-div flex j-center">
                        <AccountCircleIcon fontSize="large" className={currPage === '/login' ? "site-clr1" : "site-clr3"}></AccountCircleIcon></div>
                    {(!loggedInUser && currPage === '/login') && loginSection}
                    {(!loggedInUser && currPage === '/signup') && signupSection}
                </div>
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.userModule.users,
        loggedInUser: state.userModule.loggedInUser
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