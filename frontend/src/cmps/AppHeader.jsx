import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store/actions/userActions.js'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import EditIcon from '@material-ui/icons/Edit'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import {
    Menu,
    MenuItem,
    MenuHeader,
    MenuDivider
} from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/index.css'

function _AppHeader({ loggedInUser, logout }) {

    return (
        <header>
            <section className="main-layout flex j-between a-center">
                <div className="logo"><Link to="/">Arter</Link></div>
                <nav className="flex">
                    <Link to="/explore" className="link"><h3>Explore</h3></Link>
                    <Link to={loggedInUser ? '/item/edit' : '/login'} className="link"><h3>Publish</h3></Link>
                    {loggedInUser ?
                        <Menu align="end" menuButton={<img src={loggedInUser.imgUrls.profile} />}>
                            <MenuHeader>Account</MenuHeader>
                            <MenuItem><AccountBoxIcon /><Link to={`/user/${loggedInUser._id}`}>&nbsp;&nbsp;Profile</Link></MenuItem>
                            <MenuDivider />
                            <MenuItem><EditIcon />&nbsp;&nbsp;Edit Profile</MenuItem>
                            <MenuItem onClick={logout}><ExitToAppIcon /><Link to="/">&nbsp;&nbsp;Logout</Link></MenuItem>
                        </Menu>
                        : <Link to="/login"><AccountCircleIcon/></Link>} 
                </nav>
            </section>
        </header>
    )
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser,
    }
}
const mapDispatchToProps = {
    logout
}
export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader)