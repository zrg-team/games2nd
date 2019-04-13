import React from 'react'
import { useSpring, animated } from 'react-spring'
import withStyles from '@material-ui/core/styles/withStyles'
import { formatCurrency } from '../../../common/utils/format'
import { back, next } from '../../../common/utils/navigation'
import Lottie from '../../../libraries/Lottie'
import { PLATFORMS } from '../models'
import Button from '../../../libraries/CustomButtons/Button'
import navbarsStyle from '../../../assets/jss/material-kit-react/views/componentsSections/navbarsStyle'

const HtmlToReactParser = require('html-to-react').Parser
const htmlToReactParser = new HtmlToReactParser()

function ProductInformation ({ user, product, shop, classes }) {
  let backgroundColor
  if (product.platform === 'xboxone' || product.platform === 'xbox360') {
    backgroundColor = '#107C0F'
  } else if (product.platform === 'playstation3' || product.platform === 'playstation4') {
    backgroundColor = '#015DC0'
  } else if (product.platform === 'switch') {
    backgroundColor = '#F20000'
  }
  const { transform } = useSpring({
    from: {transform: [0, -20, 0]},
    transform: [0, 0, 0]
  })
  return (
    <animated.div
      className='row'
      style={{
        transform: transform.interpolate((x, y, z) => `translate3d(${x}px, ${y}px, ${z}px)`)
      }}
    >
      <div
        className='desc1-left col-md-4'
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <img src={product.banner} className='img-fluid' alt='' />
      </div>
      <div className='desc1-right col-md-8 pl-lg-4'>
        <h3 className='shop-sing' style={{ marginTop: '0' }}>{product.name}</h3>
        <h5>{formatCurrency(product.price)} {/* <span>599</span> */} VND</h5>
        <div className='available mt-3'>
          {/* <form action='#' method='post' className='w3layouts-newsletter'>
            <input type='email' name='Email' placeholder='Enter your email...' required='' />
            <button className='btn1'>Check</button>

          </form> */}
          <span style={{ backgroundColor }} className='product-new-top'>{PLATFORMS[product.platform]}</span>
          <br />
          {product.isNew ? <span className='product-new-top'>New</span> : null}
          <br />
          {product.trade ? <span className='product-new-top'>Trade</span> : null}
          <span><a href='#'>Notification me same game arrival.</a></span>
          {/* <p>Lorem Ipsum has been the industry's standard since the 1500s. Praesent ullamcorper dui turpis.. </p> */}
        </div>
        <div className='share-desc'>
          <div className='share'>
            <h4>Purchase Product :</h4>
            <ul className='w3layouts_social_list list-unstyled'>
              <li className='mx-2'>
                <Button
                  color='twitter'
                  fullWidth
                  onClick={() => {
                    if (!user || !user.uid) {
                      return next('/login')
                    }
                    const message = `I'm interested in ${product.name} - ${formatCurrency(product.price)} VND. ID: ${product.uid}`
                    next(`/profile/${shop.uid}`, { message })
                  }}
                >
                  <i
                    className={
                      classes.socialIcons +
                      ' ' +
                      classes.marginRight5 +
                      ' fa fa-commenting-o'
                    }
                  />{' '}
                  Buy Now
                </Button>
              </li>
              <li>
                {shop.facebookID
                  ? <Button
                    color='facebook'
                    onClick={() => {
                      if (!user || !user.uid) {
                        return next('/login')
                      }
                      window.open(shop.facebook, '_blank')
                    }}
                    fullWidth
                  >
                    <i
                      className={
                        classes.socialIcons +
                        ' ' +
                        classes.marginRight5 +
                        ' fa fa-facebook-official'
                      }
                    />{' '}
                    Facebook
                  </Button>
                  : null}
              </li>
              {/* <li>
                <a href='#' className='w3pvt_dribble'>
                  <span className='fa fa-dribbble' />
                </a>
              </li>
              <li className='ml-2'>
                <a href='#' className='w3pvt_google'>
                  <span className='fa fa-google-plus' />
                </a>
              </li> */}
            </ul>
          </div>
          <div className='clearfix' />
        </div>
      </div>
    </animated.div>
  )
}

class ProductDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      ready: false,
      product: {},
      shop: {}
    }
  }
  async componentDidMount () {
    const { user, uid, location, getProduct, getShopInformation } = this.props
    let product = {}
    let shop = {}
    try {
      if (location && location.state && location.state.product) {
        product = location.state.product
      } else {
        product = await getProduct(uid)
      }
      if (user && user.uid) {
        shop = await getShopInformation(product.user)
      }
      return this.setState({
        shop,
        product,
        ready: true
      })
    } catch (error) {
      console.log('error', error)
      back()
    }
  }
  render () {
    const { classes, user } = this.props
    const { product = {}, ready, shop } = this.state
    if (!ready) {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%'
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#000',
              opacity: 0.25,
              position: 'absolute'
            }}
          />
          <Lottie
            options={{
              animationData: require('../../../assets/animations/loading-page.json')
            }}
            width={120}
            height={120}
          />
        </div>
      )
    }
    const reactElement = htmlToReactParser.parse(product.description || '')
    return (
      <div className='left-ads-display col-lg-12'>
        <ProductInformation product={product} shop={shop} classes={classes} user={user} />
        <div className='row sub-para-w3layouts mt-5'>
          <br />
          {reactElement ? reactElement.map(Item => Item) : null}
        </div>

        {/* <h3 className='shop-sing'>Featured Products</h3>
        <div className='row m-0'>
          <div className='col-md-4 product-men'>
            <div className='product-shoe-info shoe text-center'>
              <div className='men-thumb-item'>
                <img src='images/s10.jpg' className='img-fluid' alt='' />
                <span className='product-new-top'>New</span>
              </div>
              <div className='item-info-product'>
                <h4>
                  <a href='shop-single.html'>Suitable Lace Up </a>
                </h4>

                <div className='product_price'>
                  <div className='grid-price'>
                    <span className='money'>$675.00</span>
                  </div>
                </div>
                <ul className='stars'>
                  <li><a href='#'><span className='fa fa-star' aria-hidden='true' /></a></li>
                  <li><a href='#'><span className='fa fa-star' aria-hidden='true' /></a></li>
                  <li><a href='#'><span className='fa fa-star-half-o' aria-hidden='true' /></a></li>
                  <li><a href='#'><span className='fa fa-star-half-o' aria-hidden='true' /></a></li>
                  <li><a href='#'><span className='fa fa-star-o' aria-hidden='true' /></a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className='col-md-4 product-men'>
            <div className='product-shoe-info shoe text-center'>
              <div className='men-thumb-item'>
                <img src='images/s11.jpg' className='img-fluid' alt='' />
                <span className='product-new-top'>New</span>
              </div>
              <div className='item-info-product'>
                <h4>
                  <a href='shop-single.html'>Black Flats</a>
                </h4>

                <div className='product_price'>
                  <div className='grid-price'>
                    <span className='money'>$475.00</span>
                  </div>
                </div>
                <ul className='stars'>
                  <li><a href='#'><span className='fa fa-star' aria-hidden='true' /></a></li>
                  <li><a href='#'><span className='fa fa-star' aria-hidden='true' /></a></li>
                  <li><a href='#'><span className='fa fa-star' aria-hidden='true' /></a></li>
                  <li><a href='#'><span className='fa fa-star-half-o' aria-hidden='true' /></a></li>
                  <li><a href='#'><span className='fa fa-star-o' aria-hidden='true' /></a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className='col-md-4 product-men'>
            <div className='product-shoe-info shoe text-center'>
              <div className='men-thumb-item'>
                <img src='images/s12.jpg' className='img-fluid' alt='' />
                <span className='product-new-top'>New</span>
              </div>
              <div className='item-info-product'>
                <h4>
                  <a href='shop-single.html'>Elevator Shoes </a>
                </h4>

                <div className='product_price'>
                  <div className='grid-price'>
                    <span className='money'>$575.00</span>
                  </div>
                </div>
                <ul className='stars'>
                  <li><a href='#'><span className='fa fa-star' aria-hidden='true' /></a></li>
                  <li><a href='#'><span className='fa fa-star' aria-hidden='true' /></a></li>
                  <li><a href='#'><span className='fa fa-star' aria-hidden='true' /></a></li>
                  <li><a href='#'><span className='fa fa-star-half-o' aria-hidden='true' /></a></li>
                  <li><a href='#'><span className='fa fa-star-o' aria-hidden='true' /></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    )
  }
}

export default withStyles(navbarsStyle)(ProductDetail)
