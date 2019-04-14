import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { useSpring, animated } from 'react-spring'
import { formatCurrency } from '../../../common/utils/format'
import { next } from '../../../common/utils/navigation'
import Paginations from '../../../libraries/Pagination/Pagination'
import { PLATFORMS, LIMIT } from '../models'

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
      onClick={() => {
        next(`/product/${item.uid}`, { product: item })
      }}
      style={{
        transform: transform.interpolate((x, y, z) => `translate3d(${x}px, ${y}px, ${z}px)`)
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
            className='img-fluid product-image-sm'
            alt=''
            />
          <p>
            <span style={{ backgroundColor }} className='product-new-top'>{PLATFORMS[item.platform]}</span>
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
class ProductList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      offset: null,
      page: 1,
      ready: false
    }
    this.pages = {}
    this.onLoadMore = this.onLoadMore.bind(this)
    this.renderItem = this.renderItem.bind(this)
    this.gotoPage = this.gotoPage.bind(this)
  }
  onLoadMore () {
    const { searchProducts, offset, search } = this.props
    searchProducts(LIMIT, offset, search)
  }
  async componentDidMount () {
    const { page } = this.state
    const { getProducts, location } = this.props
    if (location && location.state && Object.keys(location.state).length) {
      this.scrollParentRef = document.getElementById('root')
      return this.setState({
        ready: true
      })
    }
    const result = await getProducts(page, LIMIT)
    this.scrollParentRef = document.getElementById('root')
    this.pages[2] = result
    this.setState({
      ready: true
    })
  }
  async gotoPage (nextPage) {
    const { page } = this.state
    const { getProducts } = this.props
    if (page === nextPage) {
      return
    }
    const offset = this.pages[+nextPage]
    const result = await getProducts(+nextPage, LIMIT, offset)
    this.pages[+nextPage + 1] = result
    this.setState({
      page: nextPage
    })
  }
  renderItem (item) {
    return <ProductItem key={item.uid} item={item} />
  }
  renderPagination () {
    const { page } = this.state
    const { totalPage } = this.props
    if (!totalPage) {
      return null
    }
    const pages = []
    const total = Object.keys(this.pages).length
    let isMorePre = false
    let isMoreNext = false
    for (let i = 1; i <= total; i++) {
      if (i > page - 3 && i < page + 3) {
        pages.push({
          text: `${i}`,
          active: page === i,
          onClick: () => {
            this.gotoPage(i)
          }
        })
      } else if (i <= page - 3 && !isMorePre) {
        isMorePre = true
        pages.push({
          text: `...`
        })
      } else if (i >= page + 3 && !isMoreNext) {
        isMoreNext = true
        pages.push({
          text: `...`
        })
      }
    }
    if (page !== 1) {
      pages.unshift({
        text: 'FIRST',
        active: true,
        onClick: () => this.gotoPage(1)
      })
    }
    if (page !== totalPage && total < totalPage) {
      pages.push({
        text: 'NEXT',
        active: true,
        onClick: () => this.gotoPage(+page + 1)
      })
    }
    return <Paginations
      style={{
        width: undefined,
        minWidth: '80%',
        marginLeft: 15,
        marginRight: 15
      }}
      pages={pages}
      color='primary'
    />
  }
  render () {
    const { ready, page } = this.state
    const { end, products, searchMode, searchResult } = this.props
    const data = products[page] || []
    if (!ready) {
      return null
    }
    return (
      <div className='row'>
        {searchMode
          ? (
            <InfiniteScroll
              pageStart={0}
              loadMore={this.onLoadMore}
              hasMore={!end}
              style={{
                width: '100%',
                display: 'flex',
                flexWrap: 'wrap'
              }}
              loader={null}
              useWindow={false}
              getScrollParent={() => this.scrollParentRef}
            >
              {searchResult
                ? searchResult.map(this.renderItem)
                : null
              }
            </InfiniteScroll>
          )
          : data.map(this.renderItem)
        }
        {!searchMode ? this.renderPagination() : null}
      </div>
    )
  }
}

export default ProductList
