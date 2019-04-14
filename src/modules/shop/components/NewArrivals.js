import React from 'react'
import { useSpring, animated } from 'react-spring'
import { PLATFORMS } from '../models'
import { next } from '../../../common/utils/navigation'
import { formatCurrency } from '../../../common/utils/format'

const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1]
const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

function ProductItem ({ item }) {
  const [props, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }))
  const { transform } = useSpring({
    from: {transform: [0, -20, 0]},
    transform: [0, 0, 0]
  })
  let backgroundColor
  if (item.platform === 'xboxone' || item.platform === 'xbox360') {
    backgroundColor = '#107C0F'
  } else if (item.platform === 'playstation3' || item.platform === 'playstation4') {
    backgroundColor = '#015DC0'
  } else if (item.platform === 'switch') {
    backgroundColor = '#F20000'
  }
  return (
    <animated.div
      key={item.uid}
      style={{
        transform: transform.interpolate((x, y, z) => `translate3d(${x}px, ${y}px, ${z}px)`)
      }}
      onClick={() => {
        next(`/product/${item.uid}`, { product: item })
      }}
      className='col-md-4 product-men'
    >
      <div className='product-shoe-info shoe text-center'>
        <animated.div
          className='men-thumb-item'
          onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
          onMouseLeave={() => set({ xys: [0, 0, 1] })}
          style={{ transform: props.xys.interpolate(trans) }}
        >
          <img
            style={{
              objectFit: 'scale-down'
            }}
            src={item.banner}
            className='img-fluid product-image-lg'
            alt=''
            />
          <p>
            <span
              className='product-new-top'
              style={{ backgroundColor }}
            >{PLATFORMS[item.platform]}
            </span>
          </p>
        </animated.div>
        <div className='item-info-product'>
          <h4>
            <a href='shop-single.html'>{item.name} </a>
          </h4>

          <div className='product_price'>
            <div className='grid-price'>
              <span className='money'>{formatCurrency(item.price)}</span>
            </div>
          </div>
          {/* <ul className='stars'>
            <li><a href='#'><span className='fa fa-star' aria-hidden='true' /></a></li>
            <li><a href='#'><span className='fa fa-star' aria-hidden='true' /></a></li>
            <li><a href='#'><span className='fa fa-star-half-o' aria-hidden='true' /></a></li>
            <li><a href='#'><span className='fa fa-star-half-o' aria-hidden='true' /></a></li>
            <li><a href='#'><span className='fa fa-star-o' aria-hidden='true' /></a></li>
          </ul> */}
        </div>
      </div>
    </animated.div>
  )
}
class NewArrivals extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
    this.renderItem = this.renderItem.bind(this)
  }
  componentDidMount () {
    const { getNewsProducts } = this.props
    getNewsProducts()
  }
  renderItem (item) {
    return <ProductItem key={item.uid} item={item} />
  }
  render () {
    const { products } = this.props
    const data = products['new'] || []
    return (
      <section className='about py-5'>
        <div className='container pb-lg-3'>
          <h3 className='tittle text-center'>New Games</h3>
          <div className='row'>
            {data.map(this.renderItem)}
          </div>

        </div>
      </section>
    )
  }
}

export default NewArrivals
