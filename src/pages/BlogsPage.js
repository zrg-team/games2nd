import React, { Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import componentsStyle from '../assets/jss/material-kit-react/views/components'
import HeaderStore from '../modules/shop/containers/HeaderStore'
import FooterStore from '../modules/shop/components/FooterStore'
import Blogs from '../modules/publics/containers/Blogs'

class BlogsPage extends React.Component {
  render () {
    return (
      <Fragment>
        <HeaderStore minimal />
        <Blogs />
        <FooterStore />
      </Fragment>)
  }
}

export default withStyles(componentsStyle)(BlogsPage)
