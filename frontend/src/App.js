// import React from 'react';
import { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import './styles/global.scss'
import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { Home } from './pages/Home.jsx';
import { Explore } from './pages/Explore.jsx';
import { UserDetails } from './pages/UserDetails.jsx';
import { ItemDetails } from './pages/ItemDetails.jsx';
import { loadItems } from './store/actions/itemActions'
import { loadUsers } from './store/actions/userActions'
import { LoginSignup } from './pages/LoginSignup'
import { ItemEdit } from './pages/ItemEdit'
// import { AppFilter } from './cmps/AppFilter'

class _App extends Component {

  async componentDidMount() {
    await this.props.loadItems()
    await this.props.loadUsers()
  }

  render() {
    console.log('APP.JSX', this.props.items);
    return (
      <main>
        <AppHeader />
        <Switch>
          <Route exact path="/signup" component={LoginSignup} />
          <Route exact path="/login" component={LoginSignup} />
          <Route exact path="/item/edit/:id?" component={ItemEdit} />
          <Route exact path="/item/:id" component={ItemDetails} />
          <Route path="/explore" component={Explore} />
          <Route path="/user/:id" component={UserDetails} />
          <Route path="/" component={Home} />
        </Switch>
        <AppFooter />
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // loggedInUser: state.userModule.loggedInUser,
    items: state.itemModule.items
  }
}

const mapDispatchToProps = {
  loadItems,
  loadUsers
}

export const App = connect(mapStateToProps, mapDispatchToProps)(_App)