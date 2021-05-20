import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
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
            <section className="main-layout flex j-between a-baseline">
                <div className="logo"><NavLink to="/">Arter</NavLink></div>
                <nav className="flex">
                    <NavLink to="/explore" className="link">
                        <h3>Explore</h3>
                    </NavLink>
                    <NavLink to={loggedInUser ? '/item/edit' : '/login'} className="link">
                        <h3>Publish</h3>
                    </NavLink>
                    {loggedInUser ?
                        <Menu align="end" menuButton={<img src={loggedInUser.imgUrls.profile ||
                            'https://www.infinitealoe.com/media/wysiwyg/swatches/grey.png'} alt="" />}>
                            <MenuHeader>Account</MenuHeader>
                            <MenuItem><AccountBoxIcon /><NavLink to={`/user/${loggedInUser._id}`}>&nbsp;&nbsp;Profile</NavLink></MenuItem>
                            <MenuDivider />
                            <MenuItem><EditIcon /><NavLink to={`/user/edit/${loggedInUser._id}`}>&nbsp;&nbsp;Edit Profile</NavLink></MenuItem>
                            <MenuItem onClick={logout}><ExitToAppIcon /><NavLink to="/">&nbsp;&nbsp;Logout</NavLink></MenuItem>
                        </Menu>
                        : <NavLink to="/login"><AccountCircleIcon /></NavLink>}
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