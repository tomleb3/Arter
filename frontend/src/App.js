import React from 'react';
import { Switch, Route } from 'react-router-dom'
import './styles/global.scss'
import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { Home } from './pages/Home.jsx';
import { Explore } from './pages/Explore.jsx';
import { UserDetails } from './pages/UserDetails.jsx';
import { ItemDetails } from './pages/ItemDetails.jsx';

export function App() {
  return (
    <main>
      <AppHeader />
      <Switch>
        <Route exact path="/item/:id" component={ItemDetails} />
        <Route path="/explore" component={Explore} />
        <Route path="/user/:id" component={UserDetails} />
        <Route path="/" component={Home} />
      </Switch>
      <AppFooter />
    </main>
  );
}

// export const App = connect(mapStateToProps, mapDispatchToProps)(_App)