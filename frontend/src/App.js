import React from 'react';
// import { routes } from './routes.js'
import { AppHeader } from './cmps/AppHeader.jsx'
import { Switch, Route } from 'react-router-dom'
import './styles/global.scss'
import { Home } from './pages/Home.jsx';
import { Explore } from './pages/Explore.jsx';

function App() {
  return (
    <main>
      <AppHeader />
      <Switch>
        <Route path="/explore" component={Explore} />
        <Route path="/" component={Home} />
      </Switch>
    </main>
  );
}

export default App;