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
import { loadItems } from './store/actions/itemActions.js'
import { loadUsers } from './store/actions/userActions.js'
import { loadOrders } from './store/actions/orderActions.js'
import { LoginSignup } from './pages/LoginSignup'
import { ItemEdit } from './pages/ItemEdit'
import { socketService } from './services/socketService.js'
import swal from '@sweetalert/with-react'

class _App extends Component {

  async componentDidMount() {
    await this.props.loadItems()
    await this.props.loadUsers()
    await this.props.loadOrders()
    socketService.setup()
    socketService.on('ORDER_IN', this.onOrderIn)
  }

  componentWillUnmount() {
    socketService.terminate()
  }

  onOrderIn = order => {
    return swal(
      <div>
        <h1>Hey there!</h1>
        <p><a className="site-clr1" href={`#/user/${order.buyer._id}`}>{order.buyer.fullname}</a> has just bought <a className="site-clr1" href={`#/item/${order.item._id}`}>{order.item.title}</a> from you!</p>
        <p>you can see view your sold items in<a className="site-clr1" href={`#/user/${order.seller._id}`}> your profile page</a></p>
      </div>)
  }

  render() {
    const { users, items, orders } = this.props

    return (
      <main>
        <AppHeader />
        { items.length && users.length && orders.length ?
          <Switch>
            <Route exact path="/signup" component={LoginSignup} />
            <Route exact path="/login" component={LoginSignup} />
            <Route exact path="/item/edit/:id?" component={ItemEdit} />
            <Route exact path="/item/:id" component={ItemDetails} />
            <Route path="/explore" component={Explore} />
            <Route path="/user/:id" component={UserDetails} />
            <Route path="/" component={Home} />
          </Switch> : ''}
        <AppFooter />
      </main >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.itemModule.items,
    users: state.userModule.users,
    orders: state.orderModule.orders
  }
}

const mapDispatchToProps = {
  loadItems,
  loadUsers,
  loadOrders
}

export const App = connect(mapStateToProps, mapDispatchToProps)(_App)