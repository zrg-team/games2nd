import React, { Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import componentsStyle from '../assets/jss/material-kit-react/views/components'
import HeaderStore from '../modules/shop/containers/HeaderStore'
import FooterStore from '../modules/shop/components/FooterStore'
import Blog from '../modules/publics/containers/Blog'

class BlogPage extends React.Component {
  render () {
    return (
      <Fragment>
        <HeaderStore minimal />
        <Blog match={this.props.match} />
        <FooterStore />
      </Fragment>)
  }
}

export default withStyles(componentsStyle)(BlogPage)
