import React from 'react'
import { LIMIT, PLATFORMS, PRICE_RANGES } from '../models'
import { formatCurrency } from '../../../common/utils/format'
import { next } from '../../../common/utils/navigation'

class SearchPanel extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      price: {},
      platform: ''
    }
    this.onSelectPriceRange = this.onSelectPriceRange.bind(this)
    this.onSelectPlatform = this.onSelectPlatform.bind(this)
    this.onChangeText = this.onChangeText.bind(this)
    this.searchName = this.searchName.bind(this)
  }
  componentDidMount () {
    const { location, getGreatDeals } = this.props
    getGreatDeals()
    if (location && location.state && location.state.platform) {
      this.onSelectPlatform({
        target: {
          value: location.state.platform
        }
      })
    } else if (location && location.state && location.state.name) {
      this.setState({
        platform: '',
        price: {},
        name: location.state.name
      }, () => {
        this.searchName()
      })
    }
  }
  onSelectPriceRange (e) {
    const { price: lastPrice } = this.state
    const price = PRICE_RANGES.find(item => `${item.key}` === `${e.target.value}`)
    this.setState({
      name: '',
      platform: '',
      price: price.key === lastPrice.key
        ? {} : price
    }, async () => {
      const { price } = this.state
      const { searchProducts, getProducts } = this.props
      if (price && Object.keys(price).length) {
        await searchProducts(LIMIT, undefined, { price })
      } else {
        await getProducts(1, LIMIT)
      }
    })
  }
  onSelectPlatform (e) {
    const { platform: lastPlatform } = this.state
    this.setState({
      name: '',
      price: {},
      platform: e.target.value === lastPlatform
        ? '' : e.target.value
    }, async () => {
      const { platform } = this.state
      const { searchProducts, getProducts } = this.props
      if (platform && `${platform}`.trim()) {
        await searchProducts(LIMIT, undefined, { platform })
      } else {
        await getProducts(1, LIMIT)
      }
    })
  }
  onChangeText (e) {
    this.setState({
      platform: '',
      price: {},
      name: e.target.value
    })
  }
  async searchName () {
    const { name } = this.state
    const { searchProducts, getProducts } = this.props
    if (name && `${name}`.trim()) {
      await searchProducts(LIMIT, undefined, { name })
    } else {
      await getProducts(1, LIMIT)
    }
  }
  render () {
    const { deals = [] } = this.props
    const { price = {}, name, platform } = this.state
    return (
      <div className='side-bar col-lg-4'>
        <div className='search-bar w3layouts-newsletter'>
          <h3 className='sear-head'>Search Here..</h3>
          <form action='#' method='post' className='d-flex'>
            <input
              type='search'
              placeholder='Product name...'
              name='search'
              value={name}
              onChange={this.onChangeText}
              className='form-control'
              required='' />
            <button
              className='btn1'
              type='button'
              onClick={this.searchName}
            >
              <span className='fa fa-search' aria-hidden='true' />
            </button>
          </form>
        </div>
        <div className='left-side my-4'>
          <h3 className='sear-head'>Platforms</h3>
          <ul className='w3layouts-box-list'>
            {Object.keys(PLATFORMS).map((key) => {
              return (
                <li key={key}>
                  <input
                    value={key}
                    type='checkbox'
                    checked={platform === key}
                    onChange={this.onSelectPlatform}
                    className='checked' />
                  <span style={{ paddingLeft: 10 }} className='span'>{PLATFORMS[key]}</span>
                </li>
              )
            })}
          </ul>
        </div>
        <div className='left-side'>
          <h3 className='sear-head'>Prices</h3>
          <ul className='w3layouts-box-list'>
            {PRICE_RANGES.map(item => {
              return (
                <li key={item.key}>
                  <input
                    value={item.key}
                    type='checkbox'
                    checked={price.key === item.key}
                    onChange={this.onSelectPriceRange}
                    className='checked' />
                  <span style={{ paddingLeft: 10 }} className='span'>{item.label}</span>
                </li>
              )
            })}
          </ul>
        </div>
        {/* <div className='customer-rev left-side my-4'>
          <h3 className='sear-head'>Customer Review</h3>
          <ul className='w3layouts-box-list'>
            <li>
              <a href='#'>
                <span className='fa fa-star' aria-hidden='true' />
                <span className='fa fa-star' aria-hidden='true' />
                <span className='fa fa-star' aria-hidden='true' />
                <span className='fa fa-star' aria-hidden='true' />
                <span className='fa fa-star' aria-hidden='true' />
                <span>5.0</span>
              </a>
            </li>
            <li>
              <a href='#'>
                <span className='fa fa-star' aria-hidden='true' />
                <span className='fa fa-star' aria-hidden='true' />
                <span className='fa fa-star' aria-hidden='true' />
                <span className='fa fa-star' aria-hidden='true' />
                <span className='fa fa-star-o' aria-hidden='true' />
                <span>4.0</span>
              </a>
            </li>
            <li>
              <a href='#'>
                <span className='fa fa-star' aria-hidden='true' />
                <span className='fa fa-star' aria-hidden='true' />
                <span className='fa fa-star' aria-hidden='true' />
                <span className='fa fa-star-half-o' aria-hidden='true' />
                <span className='fa fa-star-o' aria-hidden='true' />
                <span>3.5</span>
              </a>
            </li>
            <li>
              <a href='#'>
                <span className='fa fa-star' aria-hidden='true' />
                <span className='fa fa-star' aria-hidden='true' />
                <span className='fa fa-star' aria-hidden='true' />
                <span className='fa fa-star-o' aria-hidden='true' />
                <span className='fa fa-star-o' aria-hidden='true' />
                <span>3.0</span>
              </a>
            </li>
            <li>
              <a href='#'>
                <span className='fa fa-star' aria-hidden='true' />
                <span className='fa fa-star' aria-hidden='true' />
                <span className='fa fa-star-half-o' aria-hidden='true' />
                <span className='fa fa-star-o' aria-hidden='true' />
                <span className='fa fa-star-o' aria-hidden='true' />
                <span>2.5</span>
              </a>
            </li>
          </ul>
        </div> */}
        <div className='deal-leftmk left-side'>
          <h3 className='sear-head'>Special Deals</h3>
          {deals.map(item => {
            return (
              <div
                className='special-sec1 row mb-3 great-deal-container'
                onClick={() => {
                  next(`/product/${item.ref}`)
                }}
              >
                <div className='img-deals col-md-4'>
                  <img
                    src={item.banner} className='img-fluid great-deal-img'
                    alt='' />
                </div>
                <div className='img-deal1 col-md-4'>
                  <h3>{item.name}</h3>
                  <p >{formatCurrency(item.price)} VND</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default SearchPanel
