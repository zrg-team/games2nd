import React, { Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import componentsStyle from '../assets/jss/material-kit-react/views/components'
import HeaderStore from '../modules/shop/containers/HeaderStore'
import Features from '../modules/shop/components/Features'
import NewArrivals from '../modules/shop/containers/NewArrivals'
import LatestChat from '../modules/shop/containers/LatestChat'
import PopularCategories from '../modules/shop/components/PopularCategories'
import PopularSeller from '../modules/shop/components/PopularSeller'
import FooterStore from '../modules/shop/components/FooterStore'

class ShopHomePage extends React.Component {
  render () {
    return (
      <Fragment>
        <HeaderStore />
        <Features />
        <NewArrivals />
        <LatestChat />
        <PopularCategories />
        <PopularSeller />
        <FooterStore />
      </Fragment>)
  }
}

export default withStyles(componentsStyle)(ShopHomePage)
