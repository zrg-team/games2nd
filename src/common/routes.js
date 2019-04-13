import React, { Component, Fragment } from 'react'
import { Route } from 'react-router'
import Page from './hocs/Page'
import AutheticationPage from './hocs/AutheticationPage'
// START
// import ComponentsPage from '../pages/Components'
import SignUpPage from '../pages/SignUpPage'
import LoginPage from '../pages/LoginPage'
import HomePage from '../pages/HomePage'
import MessagesPage from '../pages/MessagesPage'
import FriendPage from '../pages/FriendPage'
import ProfilePage from '../pages/ProfilePage'
import PublicPage from '../pages/PublicPage'
import ShopHomePage from '../pages/ShopHomePage'
import ShopingPage from '../pages/ShopingPage'
import ProductPage from '../pages/ProductPage'
import AddProductPage from '../pages/AddProductPage'

// import VerifyPage from '../pages/VerifyPage'

function Authetication (Page, props = {}) {
  return <AutheticationPage Page={Page} {...props} />
}

export default class Root extends Component {
  render () {
    // const { store } = this.props
    // const {
    //   user: { userInformation }
    // } = store.getState()
    return (
      <Fragment>
        <Route exact path='/' component={Page(ShopHomePage)} />
        <Route path='/signup' component={Page(SignUpPage)} />
        <Route path='/login' component={Page(LoginPage)} />
        <Route path='/public' render={() => Authetication(PublicPage)} />
        <Route path='/room' render={() => Authetication(HomePage)} />
        <Route path='/friend' render={() => Authetication(FriendPage)} />
        <Route path='/message/:uid' render={(props) => Authetication(MessagesPage, props)} />
        <Route path='/sell' render={() => Authetication(AddProductPage)} />
        {/* <Route path='/components' render={() => <ComponentsPage />} /> */}
        <Route path='/shop' render={() => <ShopingPage />} />
        <Route path='/product/:uid' render={(props) => <ProductPage {...props} />} />
        <Route path='/profile/:uid' render={(props) => Authetication(ProfilePage, props)} />
      </Fragment>
    )
  }
}
