import React, { Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import componentsStyle from '../assets/jss/material-kit-react/views/components'
import HeaderStore from '../modules/shop/containers/HeaderStore'
import FooterStore from '../modules/shop/components/FooterStore'
import ProductList from '../modules/shop/containers/ProductList'
import SearchPanel from '../modules/shop/containers/SearchPanel'
import { replace } from '../common/utils/navigation'

class ShopingPage extends React.Component {
  render () {
    return (
      <Fragment>
        <HeaderStore minimal />
        <ol className='breadcrumb'>
          <li
            onClick={() => {
              replace('/')
            }}
            className='breadcrumb-item'
          >
            <a>Home</a>
          </li>
          <li className='breadcrumb-item active'>Shopping</li>
        </ol>
        <section className='ab-info-main py-md-5 py-4'>
          <div className='container py-md-3'>
            <div className='row shopping-container'>
              <SearchPanel />
              <div className='left-ads-display col-lg-8'>
                <ProductList />
                <div className='grid-img-right mt-4 text-right'>
                  <span className='money'>BUY OR SELL</span>
                  <a href='#' className='btn'>You all welcome</a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <FooterStore />
      </Fragment>)
  }
}

export default withStyles(componentsStyle)(ShopingPage)
