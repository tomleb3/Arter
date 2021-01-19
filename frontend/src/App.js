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
import { socketService } from './services/socketService.js'

class _App extends Component {

  async componentDidMount() {
    await this.props.loadItems()
    await this.props.loadUsers()
    socketService.setup()
    socketService.on('ORDER_IN', this.onOrderIn)
  }

  componentWillUnmount() {
    socketService.terminate()
  }

  onOrderIn = order => {
    console.log('APP.JS:', order)
  }

  render() {
    const { users, items } = this.props

    return (
      <main>
        <AppHeader />
        { users.length &&
          <Switch>
            <Route exact path="/signup" component={LoginSignup} />
            <Route exact path="/login" component={LoginSignup} />
            <Route exact path="/item/edit/:id?" component={ItemEdit} />
            <Route exact path="/item/:id" component={ItemDetails} />
            <Route path="/explore" component={Explore} />
            <Route path="/user/:id" component={UserDetails} />
            <Route path="/" component={Home} />
          </Switch>}
        <AppFooter />
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // loggedInUser: state.userModule.loggedInUser,
    items: state.itemModule.items,
    users: state.userModule.users
  }
}

const mapDispatchToProps = {
  loadItems,
  loadUsers
}

export const App = connect(mapStateToProps, mapDispatchToProps)(_App)