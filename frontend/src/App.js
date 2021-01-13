import React from 'react';
import './App.css';
import { routes } from './routes.js'
import { AppHeader } from './cmps/AppHeader.jsx'
import { Switch, Route } from 'react-router-dom'
import './styles/styles.scss'

function App() {
  return (
    <main>
      <AppHeader />
      <Switch>
        {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
      </Switch>
    </main>
  );
}

export default App;