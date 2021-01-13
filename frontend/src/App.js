import React from 'react';
// import { routes } from './routes.js'
import { AppHeader } from './cmps/AppHeader.jsx'
import { Switch, Route } from 'react-router-dom'
import './styles/global.scss'
import { Home } from './pages/Home.jsx';
import { Explore } from './pages/Explore.jsx';
import { UserDetails } from './pages/UserDetails.jsx';
import { ItemDetails } from './pages/ItemDetails.jsx';

function App() {
  return (
    <main>
      <AppHeader />
      <Switch>
        <Route exact path="/explore/:id" component={ItemDetails} />
        <Route path="/explore" component={Explore} />
        <Route path="/user/:id" component={UserDetails} />
        <Route path="/" component={Home} />
        {/* {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)} */}
      </Switch>
    </main>
  );
}
// /explore/v140

export default App;