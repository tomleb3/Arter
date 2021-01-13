import React from 'react';
import { Switch, Route } from 'react-router-dom'
import './styles/global.scss'
import { AppHeader } from './cmps/AppHeader.jsx'
import { Home } from './pages/Home.jsx';
import { Explore } from './pages/Explore.jsx';
import { UserDetails } from './pages/UserDetails.jsx';
// import { routes } from './routes.js'

function App() {
  return (
    <main>
      <AppHeader />
      <Switch>
        <Route path="/explore" component={Explore} />
        <Route path="/user/:id" component={UserDetails} />
        <Route path="/" component={Home} />
        {/* {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)} */}
      </Switch>
    </main>
  );
}

export default App;