import React, { Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import componentsStyle from '../assets/jss/material-kit-react/views/components'
import HeaderStore from '../modules/shop/containers/HeaderStore'
import FooterStore from '../modules/shop/components/FooterStore'
import ProductDetail from '../modules/shop/containers/ProductDetail'
import SearchPanel from '../modules/shop/containers/SearchPanel'
import { replace } from '../common/utils/navigation'

class ProductPage extends React.Component {
  render () {
    return (
      <Fragment>
        <HeaderStore minimal />
        <ol className='breadcrumb'>
          <li
            onClick={() => {
              replace('/shop')
            }}
            className='breadcrumb-item'
          >
            <a>Shopping</a>
          </li>
          <li className='breadcrumb-item active'>Product</li>
        </ol>
        <section className='ab-info-main py-md-5 py-4'>
          <div className='container py-md-3'>
            <div className='row'>
              <SearchPanel />
              <div className='left-ads-display col-lg-8'>
                <ProductDetail match={this.props.match} />
              </div>
            </div>
          </div>
        </section>
        <FooterStore />
      </Fragment>)
  }
}

export default withStyles(componentsStyle)(ProductPage)
