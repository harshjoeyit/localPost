import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import PrivateRoute from './Routes/PrivateRoute'
import AuthenticatedRoute from './Routes/AuthenticatedRoute'

// components
import Register from './components/Auth/Register'
import Login from './components/Auth/Login'
import Logout from './components/Auth/Logout'
import PostList from './components/Posts/ListPosts'
import CreatePost from './components/Posts/CreatePost'
import App from './App'
import NotFound from './components/Error/NotFound'

const routing = (
  <Router>
    <Switch>
      
      <AuthenticatedRoute
        exact
        path='/register'
        component={Register}
      />
      <AuthenticatedRoute
        exact
        path='/login'
        component={Login}
      />


      <PrivateRoute 
        exact 
          path='/logout' 
          component={Logout} 
        />
      <PrivateRoute
        exact
        path='/posts'
        component={PostList}
      />
      <PrivateRoute
        exact
        path='/create-new-post'
        component={CreatePost}
      />

    
      <Route
        exact path='/'
        component={App}>
      </Route>
      <Route
        path='*'
        component={NotFound}
      />

    </Switch>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));